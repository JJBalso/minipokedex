import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { forkJoin } from 'rxjs';

import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../models/pokemons.model';

/**
 * Pokemon Detail Component that shows the Pokemon's Detail
 */
@Component({
  selector: 'app-pokemon-panel',
  templateUrl: './pokemon-panel.component.html',
  styleUrls: ['./pokemon-panel.component.scss']
})
export class PokemonPanelComponent implements OnInit, OnDestroy {

  /**
   * Details of the Main Pokemon
   */
  public pokemonDetails: PokemonDetails = new PokemonDetails();

  /**
   * Details of the Pokemons corresponding to the Evolution Chain
   */
  public pokemonEvolutions: PokemonDetails[] = [];
  
  /** 
  * Subscription to the route change
  */
  private routeSubscription: any; 

  /** 
  * Flag to detect whether the service is loading or not
  */
  public loading: boolean = true;

  /** 
   * @ignore
   */
  constructor(
    private _pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: NGXLogger
  ) { }

  /** 
   * @ignore
   */
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {      
      this.getPokemonDetails(params['name'])
   });
  }

  /** 
   * @ignore
   */
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }

  /**
   * Get the Details of the Pokemon
   * 
   * @param {string}name 
   */
  private getPokemonDetails(name: string): void {
    this.loading = true;
    this.logger.info('Loading Pokemon Details...');                 
    this._pokemonService.getPokemonSpecie(name)
    .subscribe(
      pokemonSpecie => {           
      this._pokemonService.getPokemonInfoFromSpecie(pokemonSpecie)
      .subscribe(pokemonInfos =>{
          this.pokemonDetails = pokemonInfos.details;
          this._pokemonService.getEvolutionsFromChain(pokemonInfos.evolutionChainUrl)
          .subscribe((pokemonEvolutionNames: string[]) =>{
            
            var pokemonEvolutionObserver = pokemonEvolutionNames.map(pokemonName =>{
              return this._pokemonService.getPokemonDetails(pokemonName)
            })

            forkJoin(pokemonEvolutionObserver).subscribe(pokemonEvolutions =>{
              this.pokemonEvolutions = pokemonEvolutions;
              this.loading = false;    
              this.logger.info('Loaded Pokemon Details of ' + this.pokemonDetails.name.toUpperCase());                     
            })

          })
      })
    },error=> {
      this.router.navigate(['/not-found'])
    }
    )          
  }

  /**
   * Redirects to the Pokemon Details Component
   * 
   * @param {string}name 
   */
  onPokemonEvolutionClicked(name: string){
    this.router.navigate(['/pokemon/'+name])
  }

}
