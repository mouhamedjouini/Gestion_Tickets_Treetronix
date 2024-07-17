import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private  url = 'http://localhost:5000/auth/';
  register(user:any){
    return this.http.post(this.url+'register',user,{ responseType: 'text' });
  }
  login(user:any){
    return this.http.post(this.url+'login',user);
  }
  getrole(id : any){
    return this.http.get(this.url+id)
  }
  logout() :void{
    localStorage.removeItem('token');
  }
  getall(){
    return this.http.get(this.url+'all');
  }
  supprimer(id:any){
    return this.http.delete(this.url+id);
  }
  userbyid(id:any){
    return this.http.get(this.url+'userbyid/'+id)
  }
}
