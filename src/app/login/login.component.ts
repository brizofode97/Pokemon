import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  message: string = 'Vous etes déconnectés. (pikachou/pikacho)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.authService.isLoggedIn) {
      this.message = 'Vous etes connectes';
    } else {
      this.message = 'Identifiant ou mot de passe inccorrect.';
    }
  }

  login(name: string, password: string) {
    this.message = 'Tentative de connexion en cours...';
    this.authService.login(name, password)
      .subscribe((loggeIn: boolean) => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          this.route.navigate(["/pokemons"]);
        }else{
          this.password = '';
          this.route.navigate(["/login"]);

        }
      }
      );
  }

  logout() {
    this.authService.logout();
    this.message = 'Vous etes déonnectés maintenant.'
  }

}
