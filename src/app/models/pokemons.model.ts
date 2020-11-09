/**
 * Pokemon class reference (Name and URL)
 */
export class Pokemon {
    /** 
     * @ignore
     */
    constructor(
       public name: string = "",
       public url: string = ""
    ){}
}

/**
 * Pokemon Detail class reference
 */
export class PokemonDetails {
    /** 
     * @ignore
     */
    constructor(
        public name: string = "",
        public id: string = "",
        public order: string = "",
        public height: string = "",
        public weight: string = "",
        public abilities: string[] = [],
        public types: string[] = [],
        public sprites: string[] = [],
        public mainSprite: string = ""
     ){}
}

/**
 * Pokemon Specie class reference (Evolution Info)
 */
export class PokemonSpecie{
    /** 
     * @ignore
     */
    constructor(
        public name: string = "",
        public evolvesFromName: string = "",
        public evolutionChainUrl: string = ""
     ){}
}

/**
 * Pokemon Info class reference
 */
export class PokemonInfo{
    /** 
     * @ignore
     */
    constructor(
        public name: string = "",
        public details: PokemonDetails,
        public evolvesFromPokemonDetails: PokemonDetails,
        public evolutionChainUrl: string = ""
    ){}
}

