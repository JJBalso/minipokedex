import { Component, OnInit, OnDestroy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Language } from 'angular-l10n';
import { forkJoin } from 'rxjs';

import { PokemonService } from '../services/pokemon.service';
import { PokemonInfo } from '../models/pokemons.model';


 /** 
  * Number of Pokemons loaded in the App
  */
 const maxPokemon = 25;


/** 
* Component that loads and filter the Pokemons' Data
*/
@Component({
  selector: 'app-pokeloader',
  templateUrl: './pokeloader.component.html',
  styleUrls: ['./pokeloader.component.scss']
})
export class PokeloaderComponent implements OnInit, OnDestroy {

  /** 
  * @ignore
  */
  @Language() lang: string | undefined;
  
  /**
   * Loaded Pokemon Data
   */
  private pokemonInfoList: PokemonInfo[] = [];

  /** 
  * Filtered Pokemon Data
  */
  public pokemonList: PokemonInfo[] = [];

  /** 
  * Flag to detect whether the service is loading or not
  */
  public loading: boolean = true;

  /** 
  * Value of the Search form
  */
  public textInput: string = '';

  /** 
  * @ignore
  */
  constructor(
    private _pokemonService: PokemonService,
    private logger: NGXLogger
    ) { }
  
  /** 
  * @ignore
  */
  ngOnInit() {
    this.getPokemons();  
  }

  /** 
  * @ignore
  */
  ngOnDestroy(){
  }

  /**
   * Filters the Pokemon list by value
   * 
   * @param {string}value 
   */
  filterPokemons(value: string){
    this.pokemonList = this.pokemonInfoList.filter(pokemon => pokemon.name.includes(value.toLowerCase()));
  }

  /**
   * Load all the Pokemons' Data
   */
  private getPokemons(): void {
    this.loading = true;
    this.logger.info('Loading Pokemons...');
    this._pokemonService.getPokemons(maxPokemon)
        .subscribe(
          pokemons => {          

          var pokemonSpecieObservers = pokemons.map(pokemon =>{
            return this._pokemonService.getPokemonSpecie(pokemon.name)
          })
      
          forkJoin(pokemonSpecieObservers).subscribe((pokemonSpecies) => {
            
            var pokemonInfoObservers = pokemonSpecies.map(pokemonSpecie =>{
              return this._pokemonService.getPokemonInfoFromSpecie(pokemonSpecie)
            })
      
            forkJoin(pokemonInfoObservers).subscribe(pokemonInfos =>{
              this.pokemonInfoList = pokemonInfos;
              this.pokemonList = pokemonInfos;   
              this.loading = false;               
              this.logger.info('Loaded Pokemons: ' + this.pokemonInfoList.map( pokemon => pokemon.name).toString());                 
            })
            
          });

        }, error =>{
          this.loading = false; 
        });
  }
}
