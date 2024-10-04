import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, NEVER, Observable, Subject, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  constructor(
    private route: Router,
    private pokemonService: PokemonService,
  ){}

  searchTerm = new Subject<string>;
  pokemons$: Observable<Pokemon[]>

  ngOnInit(): void {
    this.pokemons$ = this.searchTerm.pipe(
      //{...a.ab...abz..ab...abc..}
      debounceTime(300),
      //{ab.....ab...abc..}
      distinctUntilChanged(),
      //{ab...abc}
      switchMap((term) => this.pokemonService.searchPokemonlist(term)),
    )
  } 

  search(term: string){
    console.info("le chaine observable : ", term);
    this.searchTerm.next(term);
    console.info("le chaine observable1 : ", term);
  }

  goToDetails(pokemon: Pokemon){
    const link = ["/pokemon", pokemon.id];
    this.route.navigate(link); 
  }

}
