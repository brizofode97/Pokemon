import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  login(name: string, password: string) : Observable<boolean>{
    const isLoggedIn = (name == "pikachu" && password == "pikachu");
    return of(isLoggedIn).pipe(
      tap((isLoggedIn) =>{ 
      delay(1),
      this.isLoggedIn = isLoggedIn
    })
    ) 
  }

  logout(){
    this.isLoggedIn = false;
  }

}
