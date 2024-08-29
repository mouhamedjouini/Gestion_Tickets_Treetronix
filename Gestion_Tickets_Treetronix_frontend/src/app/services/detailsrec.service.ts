import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsrecService {

  constructor(private http : HttpClient,private router:Router) { }
  private  url = 'http://localhost:5000/comm';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  ajouter( comm: any){
    console.log(comm)
    return this.http.post(this.url +'/ajouter',comm)
  }
  getall():Observable<any>{
    return this.http.get<any>(this.url +'/getall')
  }
  commbyid(id:any){
    return this.http.get(this.url+'/getcommbyidform/'+id,{ headers: this.headers })
  }
}
