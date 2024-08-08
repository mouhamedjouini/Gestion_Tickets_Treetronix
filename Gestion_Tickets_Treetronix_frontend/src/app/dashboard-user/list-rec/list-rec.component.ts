import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-rec',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './list-rec.component.html',
  styleUrl: './list-rec.component.css'
})
export class ListRecComponent implements OnInit{
  constructor(private reclamationService: ReclamationService) {}
  reclamations:any
    public  url = 'http://localhost:5000'


  ngOnInit() {
    this.reclamationService.getall().subscribe(
      (res)=>{
        this.reclamations=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )

  }
}
