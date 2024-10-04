import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2>Ajouter un pokémon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class AddPokemonComponent implements OnInit {

  pokemon: Pokemon;

  ngOnInit(): void {
    this.pokemon = {
      hp: 0,
      cp: 0,
      name: "Entrer le nom...",
      picture: "https://www.pokemon.com/fr/pokedex/xxx.png",
      types: ["Normal"],
      created: new Date()
    };
  }

}
