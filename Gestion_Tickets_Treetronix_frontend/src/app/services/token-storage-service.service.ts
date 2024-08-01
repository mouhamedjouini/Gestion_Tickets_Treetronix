import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  constructor() { }
  getUserData(){

    let token = localStorage.getItem('token');
  
    if(token){
  
      let data = JSON.parse( window.atob( token.split('.')[1] ) )
      console.log(token);
  
      console.log(data);
  
      return data;
  
  
    }
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }
  
}

