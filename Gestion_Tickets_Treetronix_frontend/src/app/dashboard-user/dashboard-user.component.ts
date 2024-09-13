import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarusComponent } from './navbarus/navbarus.component';
import { HeaderComponent } from '../dashboard-admin/header/header.component';
import { FooterComponent } from '../dashboard-admin/footer/footer.component';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarusComponent,HeaderComponent,FooterComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent implements OnInit {
  constructor(private storageService:TokenStorageServiceService,private auth:AuthService){

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

}
