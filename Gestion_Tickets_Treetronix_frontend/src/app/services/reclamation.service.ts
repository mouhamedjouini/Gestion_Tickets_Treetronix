import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient,private router:Router) { }
  private  url = 'http://localhost:5000/form';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  ajouter( reclamation: any){
    console.log(reclamation)
    return this.http.post(this.url +'/add',reclamation)
  }
  getall():Observable<any>{
    return this.http.get<any>(this.url +'/all')
  }
}
