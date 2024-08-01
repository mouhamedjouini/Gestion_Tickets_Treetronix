import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { LoginResponse } from '../login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService , private storageService:TokenStorageServiceService ,private router:Router){}
  user ={
    username:'',
    password:''
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token :any|undefined
   role : any;
  ngOnInit(): void {
        
  }
  login(): void {
    this.authService.login(this.user).subscribe({
      next: (data: LoginResponse) => {
        this.token = data.token; 
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
        
          this.router.navigate(['/dashboardUser']);
        } else {
          this.errorMessage = 'Token is undefined';
          this.isLoginFailed = true;
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
  
  
        
   