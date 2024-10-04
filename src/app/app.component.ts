import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon/pokemon';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon | undefined; 

  ngOnInit(): void {
    console.info("C'est pour la table");
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: string){
    const pokemonFound: Pokemon | undefined = this.pokemonList.find((pokemon) => pokemon.id == +pokemonId);
    if(pokemonFound != undefined){
      this.pokemonSelected = pokemonFound
      console.log(`Vous avez cliqué sur le pokémon avec les bactiques ${pokemonFound.name}`);
      console.log('Vous avez cliqué sur le pokémon avec les quotes ' + pokemonFound.name);
    }
   
  }

}
