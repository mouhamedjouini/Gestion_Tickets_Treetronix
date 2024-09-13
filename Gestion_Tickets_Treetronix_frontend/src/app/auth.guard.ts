import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router =inject(Router)
  const LocalStorage =localStorage.getItem('token');
  //debugger
  if(LocalStorage!=null){
    return true;
  }else
  {
    router.navigateByUrl('/login')
    return false
  }

};