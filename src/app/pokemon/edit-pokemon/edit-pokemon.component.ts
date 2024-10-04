import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2>Editer {{ pokemon?.name }}</h2>
    <ng-container *ngIf="pokemon; else isEdit">
    <p class="center">
      <img [src]="pokemon.picture" />     
    </p>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
    </ng-container>
    <ng-template #isEdit>Aucun Pokémon à afficher</ng-template>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ){}

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) => this.pokemon = pokemon);
    } else{
      this.pokemon = undefined;
    }
  }  

}
