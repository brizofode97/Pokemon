import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const route = inject(Router);


  if(authService.isLoggedIn){
    return true;
  }

  route.navigate(["/login"]);
  return true;
};
