import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageServiceService } from '../../services/token-storage-service.service';

@Component({
  selector: 'app-navbarus',
  standalone: true,
  imports: [RouterLinkActive , RouterLink,FormsModule,CommonModule],
  templateUrl: './navbarus.component.html',
  styleUrl: './navbarus.component.css'
})
export class NavbarusComponent implements OnInit {
  constructor(private storageService:TokenStorageServiceService,private auth:AuthService,private router:Router){

  }
  currentuser:any
  id:any
  ngOnInit(): void {
    this.getCurrentUser();
   
  }
  getCurrentUser(): void {
    const user2 = this.storageService.getUserData();
    
    this.id = user2._id;
    console.log("JHJJ"+this.id);
    this.auth.userbyid(this.id).subscribe({
      next: data => {
        this.currentuser = data;
       // console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
  //  localStorage.clear(); 
    this.router.navigateByUrl('/login')
}
}
