import { Component, OnInit } from '@angular/core';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-claimbyuser',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './list-claimbyuser.component.html',
  styleUrl: './list-claimbyuser.component.css'
})
export class ListClaimbyuserComponent implements OnInit {
  constructor(private storageService:TokenStorageServiceService,private auth:AuthService,private route:ActivatedRoute,private _reclamation: ReclamationService,){

  }
  currentuser:any
  id:any
  reclamations: any[] = []; // Liste des réclamations provenant du backend
  filteredReclamations: any[] = []; // Liste filtrée qui sera affichée
  selectedStatus: string = 'ALL';
  public url = 'http://localhost:5000';
  approvedCount: number = 0;
  pendingCount: number = 0;
  rejectedCount: number = 0;
  resolvedCount: number = 0;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.formbyid(this.id)
   
  }
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

  formbyid(id: any) {
    this._reclamation.claimbyiduser(this.id).subscribe( (res) => {
        this.reclamations = res; 
        this.filteredReclamations = this.reclamations; 
        console.log(this.reclamations)
        this.countByStatus(); 
      },
      (err) => {
        console.log(err); // Gérer les erreurs éventuelles
      }
    );
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
