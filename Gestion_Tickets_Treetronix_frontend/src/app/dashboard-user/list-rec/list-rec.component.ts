import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-rec',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-rec.component.html',
  styleUrl: './list-rec.component.css'
})
export class ListRecComponent implements OnInit{
  constructor(private reclamationService: ReclamationService) {}
  reclamation:any

  ngOnInit() {
    this.reclamationService.getall().subscribe(
      (res)=>{
        this.reclamation=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )

  }
}
