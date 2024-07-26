import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarus',
  standalone: true,
  imports: [RouterLinkActive , RouterLink,FormsModule,CommonModule],
  templateUrl: './navbarus.component.html',
  styleUrl: './navbarus.component.css'
})
export class NavbarusComponent {
  constructor(private router:Router){}
  logout() {
    localStorage.removeItem('token');
  //  localStorage.clear(); 
    this.router.navigateByUrl('/login')
}
}
