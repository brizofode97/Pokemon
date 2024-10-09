import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
  // {providedIn: 'root'}
)
export class PokemonService {


  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.httpClient.get<Pokemon | undefined>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | null> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    
    return this.httpClient.put<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((response) => this.handleError(response, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.httpClient.delete<null>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((response) => this.handleError(response, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
    return this.httpClient.post<Pokemon>("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((response) => this.handleError(response, undefined))
    )
  }

  searchPokemonlist(term: string): Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([]);
    }
    return this.httpClient.get<Pokemon>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((response) => this.handleError(response, []))
    )
  }

  private log(response: Pokemon[] | Pokemon | undefined | null): void {
    console.table(`😆---le pokemon est : ${response}`);
  }

  private handleError(error: Error, errorValue: [] | any): Observable<any> {
    console.error(`😡 l'erreur est ${error.message}`);
    return of(errorValue);
  }

  getTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insect',
      'Normal',
      'Electrik',
      'Poison',
      'Fee',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
