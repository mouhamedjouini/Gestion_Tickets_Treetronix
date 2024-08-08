import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TokenStorageServiceService } from '../../services/token-storage-service.service';
export enum TypeReclamation {
  SAV = 'SAV',
  occasionnelle = 'occasionnelle'
}
@Component({
  selector: 'app-add-rec',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-rec.component.html',
  styleUrl: './add-rec.component.css'
})

export class AddRecComponent implements OnInit {
  constructor(private auth : AuthService,private storageService : TokenStorageServiceService,private reclamationService  : ReclamationService , private router : Router , private authService :AuthService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  user:any;
  reclamation={
  
    "name": "",
    "Serie": "",
    "description": "",
    "piecejointe": "",
    "user": "",
  "typereclamation": TypeReclamation.SAV

  }
  image : any;
  currentuser:any
selectedimage(event:any){
  this.image=event.target.files[0];
console.log(event.target.files[0]);

}
getCurrentUser(): void {

  const user2 =this.storageService.getUserData();
  console.log(user2)
  const id = user2._id;
  this.auth.userbyid(id).subscribe({
    next:data=>{
      this.currentuser=data
      console.log(data)
    }
    ,error:err=>{
      console.log(err)

    }
    
  })
}
ajouter() {
  const user2 =this.storageService.getUserData();
  const id = user2._id;
  this.reclamation.user = id;
  let formData = new FormData();
  formData.append('user', this.reclamation.user);
  formData.append('name', this.reclamation.name);
  formData.append('Serie', this.reclamation.Serie);
  formData.append('description', this.reclamation.description);
  formData.append('piecejointe', this.image);
  formData.append('typereclamation', this.reclamation.typereclamation.toString());
console.log(formData)
  this.reclamationService.ajouter(formData).subscribe(
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

selectedImage(event: any) {
  this.image = event.target.files[0];
  console.log(event.target.files[0]);
}
  TypeReclamationOptions: TypeReclamation[] = [
    TypeReclamation.SAV,
    TypeReclamation.occasionnelle
  ];   
}