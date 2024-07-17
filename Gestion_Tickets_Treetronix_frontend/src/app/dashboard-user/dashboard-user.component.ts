import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarusComponent } from './navbarus/navbarus.component';
import { HeaderComponent } from '../dashboard-admin/header/header.component';
import { FooterComponent } from '../dashboard-admin/footer/footer.component';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarusComponent,HeaderComponent,FooterComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {

}
