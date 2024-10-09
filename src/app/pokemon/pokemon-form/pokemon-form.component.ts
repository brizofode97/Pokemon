import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon;
  pokemonTypesList: string[];
  isAddForm: boolean;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) {/* Déconseiller d'initialiser dans le constructeur 📍⛔❌ */ }

  ngOnInit() {
    this.pokemonTypesList = this.pokemonService.getTypeList();
    this.isAddForm = this.router.url.includes("add");
  }

  hasType(type: string) {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length == 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if(this.isAddForm){
      this.pokemonService.addPokemon(this.pokemon).subscribe(
        (pokemon) => this.router.navigate(['/pokemon', pokemon.id])
      )
    }else{
      this.pokemonService.updatePokemon(this.pokemon).subscribe(
        () => this.router.navigate(['/pokemon', this.pokemon.id])
      );
    }
  }

}
