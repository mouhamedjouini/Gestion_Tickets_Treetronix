import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsrecService } from '../services/detailsrec.service';
import { ReclamationService } from '../services/reclamation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-rec',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './details-rec.component.html',
  styleUrl: './details-rec.component.css'
})
export class DetailsRecComponent implements OnInit {
  public url = 'http://localhost:5000';
  id: any; // ID de la réclamation
  commst: any; // Liste des commentaires
  image: any; // Image ajoutée dans la réclamation
  currentuser: any; // Utilisateur actuellement connecté
  form: any; // Formulaire de la réclamation

  comms = {
    form: "",
    description: "",
    piecejointe: "",
    user: "",
    Date: ""
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private _comm: DetailsrecService,
    private _reclamation: ReclamationService,
    private auth: AuthService,
    private storageService: TokenStorageServiceService,
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  // Méthode pour changer le statut d'une réclamation
  updateStatus(reclamationId: string, newStatus: string) {
    this.reclamationService.updatestatus(reclamationId,newStatus)
      .subscribe(
        (response: any) => {
          console.log('Statut mis à jour:', response);
          // Mettre à jour localement le statut de la réclamation après succès de la requête
          if (this.form && this.form._id === reclamationId) {
            this.form.status = newStatus;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.commbyid(this.id);
    this.formbyid(this.id);
    this.getCurrentUser();
  }

  // Récupérer les commentaires de la réclamation
  commbyid(id: any) {
    this._comm.commbyid(this.id).subscribe({
      next: (data) => {
        this.commst = data;
        console.log(this.commst);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Sélectionner une image à ajouter à la réclamation
  selectedimage(event: any) {
    this.image = event.target.files[0];
    console.log(event.target.files[0]);
  }

  // Récupérer l'utilisateur actuel
  getCurrentUser(): void {
    const user2 = this.storageService.getUserData();
    console.log(user2);
    const id = user2._id;
    this.auth.userbyid(id).subscribe({
      next: data => {
        this.currentuser = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // Récupérer la date actuelle
  getcurrentdate() {
    return new Date().toISOString(); // Récupérer la date actuelle au format ISO
  }

  // Ajouter un commentaire à la réclamation
  ajouter(idf: any) {
    console.log(idf);
    const user2 = this.storageService.getUserData();
    const id = user2._id;
    this.comms.user = id;
    let formData = new FormData();
    formData.append('user', this.comms.user);
    formData.append('form', idf);
    formData.append('description', this.comms.description);
    formData.append('piecejointe', this.image);
    formData.append('Date', this.getcurrentdate());
    console.log(formData);

    this._comm.ajouter(formData).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: "Réclamation ajoutée!",
          text: "Votre réclamation a été ajoutée avec succès.",
          icon: "success"
        });
        this.router.navigate(['dashboardUser']);
      },
      (err) => {
        console.log('Erreur lors de l\'ajout de la réclamation:', err);
        Swal.fire({
          title: "Erreur!",
          text: "Une erreur s'est produite lors de l'ajout de la réclamation.",
          icon: "error"
        });
      }
    );
  }

  // Récupérer les détails de la réclamation par ID
  formbyid(id: any) {
    this._reclamation.formbyid(this.id).subscribe({
      next: (data) => {
        this.form = data;
        console.log(this.form);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
