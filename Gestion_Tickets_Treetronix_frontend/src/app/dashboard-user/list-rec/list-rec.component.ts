import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-rec',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './list-rec.component.html',
  styleUrl: './list-rec.component.css'
})
export class ListRecComponent implements OnInit {
  reclamations: any[] = []; // Liste des réclamations provenant du backend
  filteredReclamations: any[] = []; // Liste filtrée qui sera affichée
  selectedStatus: string = 'ALL';
  public url = 'http://localhost:5000';
  approvedCount: number = 0;
  pendingCount: number = 0;
  rejectedCount: number = 0;
  resolvedCount: number = 0;
  constructor(private reclamationService: ReclamationService) {}

  // Méthode pour filtrer les réclamations en fonction du statut
  filterByStatus(status: string) {
    this.selectedStatus = status;

    console.log(status)
  
    if (status === 'ALL') {
      this.filteredReclamations = this.reclamations;
    } else {
  
      this.filteredReclamations = this.reclamations.filter(reclamation => reclamation.status === status);
      console.log(this.filteredReclamations)
    }
  }
  countByStatus() {
    // Comptage du nombre de réclamations par statut
    this.approvedCount = this.reclamations.filter(rec => rec.status === 'APPROVED').length;
    this.pendingCount = this.reclamations.filter(rec => rec.status === 'PENDING').length;
    this.rejectedCount = this.reclamations.filter(rec => rec.status === 'REJECTED').length;
    this.resolvedCount = this.reclamations.filter(rec => rec.status === 'RESOLVED').length;
  }
  // Méthode pour déterminer la classe CSS selon le statut
  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'badge bg-success'; // Vert pour "APPROVED"
      case 'PENDING':
        return 'badge bg-warning text-dark'; // Jaune pour "PENDING"
      case 'REJECTED':
        return 'badge bg-danger'; // Rouge pour "REJECTED"
      case 'RESOLVED':
        return 'badge bg-info'; // Bleu pour "RESOLVED"
      default:
        return 'badge bg-secondary'; // Par défaut, gris
    }
  }

  ngOnInit() {
  
    this.reclamationService.getall().subscribe(
      (res) => {
        this.reclamations = res; 
        this.filteredReclamations = this.reclamations; 
        this.countByStatus(); 
      },
      (err) => {
        console.log(err); // Gérer les erreurs éventuelles
      }
    );
  }
}
