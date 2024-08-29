import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsrecService } from '../services/detailsrec.service';
import { ReclamationService } from '../services/reclamation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-details-rec',
  standalone: true,
  imports: [DatePipe,FormsModule,CommonModule],
  templateUrl: './details-rec.component.html',
  styleUrl: './details-rec.component.css'
})
export class DetailsRecComponent implements OnInit{
  id:any;
  comms:any;
  form:any
  constructor( private route:ActivatedRoute,private _comm:DetailsrecService,private _reclamation:ReclamationService){}
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);
   
    this.commbyid(this.id);
    this.formbyid(this.id);
  }
  commbyid(id:any){
    this._comm.commbyid(this.id).subscribe({
      next: (data) => {
        this.comms = data;
        console.log(this.comms);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 formbyid(id:any){
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
