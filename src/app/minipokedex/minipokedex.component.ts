import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

import { PokemonInfo } from '../models/pokemons.model'

/**
 * Component that displays the Pokemon Card List
 */
@Component({
  selector: 'app-minipokedex',
  templateUrl: './minipokedex.component.html',
  styleUrls: ['./minipokedex.component.scss']
})
export class MinipokedexComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * Filtered Pokemon Data from loader
   */
  @Input()
  public pokemonList: PokemonInfo[] = [];

  /** 
  * Flag to detect whether the service is loading or not
  */
  private isLoaded = false;  

  /** 
   * @ignore
   */
  constructor(
    private router: Router,
    private logger: NGXLogger
  ) { }

  /** 
   * @ignore
   */
  ngOnInit() {

  }

  /** 
  * @ignore
  */
  ngOnDestroy(){
  }

  /**
   * Triggered when the input changes
   */
  ngOnChanges(){
    this.logger.info('Pokemons Displayed: ' + this.pokemonList.map( pokemon => pokemon.name).toString());    
  }

  /**
   * Redirects to the Pokemon Details Component
   * 
   * @param {string}name 
   */
  onPokemonClicked(name: string){
    this.router.navigate(['/pokemon/'+name])
  }

}
