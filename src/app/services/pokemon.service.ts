import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs'
import { map } from "rxjs/operators";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon, PokemonDetails, PokemonSpecie, PokemonInfo } from '../models/pokemons.model';
import { pokeAPI } from '../lib/api-url'

/**
 * Pokemon Services
 */
@Injectable()
export class PokemonService {

  /**
   * 
   * @ignore
   */
  constructor(private _http: HttpClient) { }

  /**
   * 
   * Gets the List of Pokemons  
   * 
   * @param {number} pokeLimit 
   * @param {number} pokeOffset 
   */
  public getPokemons(pokeLimit: number, pokeOffset? : number): Observable<Pokemon[]> {
    
    let offset = pokeOffset ? pokeOffset : 0;

    let petition = pokeAPI.baseUrl + 'pokemon/';    

    var params = new HttpParams()
      .set('limit', pokeLimit.toString())
      .set('offset', offset.toString());

    return this._http.get<any>(petition, {params} )
    .pipe(map(res => {

      let pokemonArray = new Array<Pokemon>();

      if(res['results'] && res['results'].length > 0){

        res['results'].forEach((pokemon: Pokemon) => {
          pokemonArray.push(new Pokemon(pokemon.name, pokemon.url))
        });
      }
     
      return pokemonArray;
    }));
  } 


  /**
   * Gets the Pokemon Details from the Pokemon's name
   * 
   * @param {string} name 
   */
  public getPokemonDetails(name: string): Observable<PokemonDetails>{

    let petition = pokeAPI.baseUrl + 'pokemon/' + name;

    return this._http.get<any>(petition)
    .pipe(map(res => {

      //Get Types
      let pokemonTypes: string[] = [];
      
      if(res['types'] && res['types'].length > 0){
        res['types'].forEach((pokemonType: any) => {          
          pokemonType["type"] && pokemonType["type"]["name"] && pokemonTypes.push(pokemonType["type"]["name"])          
        });
      }      

      //Process Abilities
      let pokemonAbilities: string[] = [];
      if(res['abilities'] && res['abilities'].length > 0){
        res['abilities'].forEach((pokemonAbility: any) => {          
          pokemonAbility["ability"] && pokemonAbility["ability"]["name"] && pokemonAbilities.push(pokemonAbility["ability"]["name"])          
        });
      }

      //Get Sprites & Main Sprite
      let pokemonSprites: string[] = [];
      let pokemonMainSprite: string = '';
      let sprites = res['sprites'];
      if(sprites){        
        Object.keys(sprites).forEach( key =>{          
          if(key != 'other' && key != 'versions'){    
            if(sprites[key] != null && sprites[key] != undefined){      
              pokemonSprites.push(sprites[key])
            }
          }
        }) 

        if(sprites['other'] && sprites['other']['dream_world']){          
          pokemonMainSprite = sprites['other']['dream_world']['front_default']

        } else{
          pokemonMainSprite = sprites['front_default']
        }
        
      }

      return new PokemonDetails(
        res['name'], res['id'], res['order'], res['height'], res['weight'], pokemonAbilities, pokemonTypes, pokemonSprites, pokemonMainSprite
      );

    }));

  }

  /**
   * Gets the Evolution Chain and the Pokemon Name from which the target Pokemon evolves 
   * 
   * @param {string} name 
   * 
   */
  public getPokemonSpecie(name: string): Observable<PokemonSpecie>{

    let petitionSpecies = pokeAPI.baseUrl + 'pokemon-species/' + name;

    return this._http.get<any>(petitionSpecies)
    .pipe(map(res => {

      let pokemonSpecie = new PokemonSpecie;

      pokemonSpecie.name = name;
      if (res['evolves_from_species']) pokemonSpecie.evolvesFromName = res['evolves_from_species']['name'];   
      if (res['evolution_chain']) pokemonSpecie.evolutionChainUrl = res['evolution_chain']['url'];

      return pokemonSpecie

    }));
  }


  /**
   * 
   * Gets the Pokemon Details of the target pokemon and its previous Evolution 
   * 
   * @param {PokemonSpecie} pokemonSpecie 
   */
  public getPokemonInfoFromSpecie(pokemonSpecie: PokemonSpecie): Observable<PokemonInfo>{
    return forkJoin(
          this.getPokemonDetails(pokemonSpecie.name),
          this.getPokemonDetails(pokemonSpecie.evolvesFromName)
    ).pipe(map(([mainPokemon, evolveFromPokemon]) => {
        return new PokemonInfo(pokemonSpecie.name, mainPokemon, evolveFromPokemon, pokemonSpecie.evolutionChainUrl); 
    }));
  }

  /**
   * Gets the Pokemon Names of the Evolution Chain
   * 
   * @param {string} pokemonEvolutionChain 
   */
  public getEvolutionsFromChain(pokemonEvolutionChain: string): Observable<string[]>{
    return this._http.get<any>(pokemonEvolutionChain)
    .pipe(map(res => {

      var pokemonEvolutionNames: string[] = []      
      var chain = res['chain'];
     
      this.processChain(pokemonEvolutionNames, chain);
      return pokemonEvolutionNames;

    }));
  }

  /**
   * 
   * Recursive method (Auxiliary) that updates the Array of strings eneterd to explore the Evolution Chain 
   * 
   * @param {string[]} nameList 
   * @param chain 
   */
  private processChain(nameList: string[], chain: any){

    var name = chain['species']['name'];
    nameList.push(name);

    if(chain['evolves_to']){
      for(let j = 0; j < chain['evolves_to'].length; j++){
        this.processChain(nameList, chain['evolves_to'][j])
      }  
    }
  }

}
