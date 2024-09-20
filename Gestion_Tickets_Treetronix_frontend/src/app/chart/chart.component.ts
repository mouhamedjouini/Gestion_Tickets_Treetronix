import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  barChart: any;
  pieChart: any;
  datasets: any[] = [];
  totalUsers: number = 0;  
  totalForms: number =0   
  Users:any
 
  constructor(private formService: ReclamationService,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getall().subscribe(
      (res) => {
        this.Users = res; 
        this.totalUsers=this.Users.length
        
      },
      (err) => {
        console.log(err); // Gérer les erreurs éventuelles
      }
    );
    this.formService.getall().subscribe(
      (forms: any) => {
        const labels: string[] = ['APPROVED', 'PENDING', 'REJECTED', 'RESOLVED'];
        const statusCounts = this.getStatusCounts(forms);
         this.totalForms = forms.length;

        // Calcul des pourcentages
        const statusPercentages = {
          APPROVED: (statusCounts['APPROVED'] / this.totalForms) * 100,
          PENDING: (statusCounts['PENDING'] / this.totalForms) * 100,
          REJECTED: (statusCounts['REJECTED'] / this.totalForms) * 100,
          RESOLVED: (statusCounts['RESOLVED'] / this.totalForms) * 100
        };

        const colors = ['#4CAF50', '#FFC107', '#F44336', '#2196F3'];

        // Données pour les deux graphiques
        this.datasets = [
          {
            label: 'Répartition des statuts en pourcentage',
            data: [
              statusPercentages.APPROVED,
              statusPercentages.PENDING,
              statusPercentages.REJECTED,
              statusPercentages.RESOLVED
            ],
            backgroundColor: colors,
            hoverBackgroundColor: colors
          }
        ];

        // Création du graphique à barres
        this.barChart = new Chart('barCanvas', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: this.datasets
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Statuts'
                }
              },
              y: {
                beginAtZero: true,
                display: true,
                title: {
                  display: true,
                  text: 'Pourcentage (%)'
                },
                ticks: {
                  callback: (value) => `${value}%`
                }
              }
            }
          }
        });

        // Création du graphique circulaire
        this.pieChart = new Chart('pieCanvas', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: this.datasets
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem: any) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw;
                    return `${label}: ${value.toFixed(2)}%`;
                  }
                }
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des formulaires :', error);
      }
    );
  }

  getStatusCounts(forms: any[]): { [key: string]: number } {
    const statusCounts: {
      APPROVED: number;
      PENDING: number;
      REJECTED: number;
      RESOLVED: number;
    } = {
      APPROVED: 0,
      PENDING: 0,
      REJECTED: 0,
      RESOLVED: 0
    };

    forms.forEach(form => {
      const status: string = form.status;

      // Type guard to ensure status is one of the expected values
      if (status in statusCounts) {
        statusCounts[status as keyof typeof statusCounts]++;
      }
    });

    return statusCounts;
  }
}