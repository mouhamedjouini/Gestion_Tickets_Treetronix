import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit(): void {
    
  } 
  user ={
    username:'',
    email : '',
    password:''
  }
 
register(){
  console.log(this.user)
  this.authService.register(this.user).subscribe(
    (response) => {
      this.router.navigate(['/login'])
      console.log('User registered successfully:', response);
   
    },
    (error) => {
      console.error('Error registering user:', error);
  
  })

}

}
