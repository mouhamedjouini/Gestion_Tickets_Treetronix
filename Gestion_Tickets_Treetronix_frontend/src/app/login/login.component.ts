import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { LoginResponse } from '../login-response';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService , private storageService:TokenStorageServiceService ,private router:Router,private fb: FormBuilder){
    
  }
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
          const user2 = this.storageService.getUserData();
          console.log(user2);
          const id = user2._id;
          console.log(id);
  
          // Vérifier le rôle de l'utilisateur après connexion
          this.authService.getrole(id).subscribe(
            (response: any) => {
              this.role = response.role;
              console.log(this.role);
  
              // Rediriger en fonction du rôle
              if (this.role == 'User') {
                this.router.navigate(['/dashboardUser']);
              } else {
                this.router.navigate(['/dashboardAdmin/List-Reclamation']);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.errorMessage = 'Le jeton est indéfini';
          this.isLoginFailed = true;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
  
        // Ajouter une alerte SweetAlert en cas d'échec de connexion
        Swal.fire({
          title: 'Erreur de connexion',
          text: 'Identifiants invalides. Veuillez réessayer.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
}
  
  
        
   