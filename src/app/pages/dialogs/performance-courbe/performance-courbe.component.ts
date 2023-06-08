import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerformanceData } from '../../list-membre-projet/list-membre-projet.component';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-performance-courbe',
  templateUrl: './performance-courbe.component.html',
  styleUrls: ['./performance-courbe.component.scss']
})
export class PerformanceCourbeComponent implements OnInit{

  chart:Chart

  constructor(
    public dialogRef: MatDialogRef<PerformanceCourbeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:PerformanceData,
  ){}

  ngOnInit(): void {

    const labels = ['à vérifier', 'à faire', 'terminé', 'en cours'];
    const values = [this.data.tacheAVerifier.length,
                    this.data.tacheAFaire.length,
                    this.data.tacheTerminer.length,
                    this.data.tacheEnCours.length]

    const faiblePerformance = [this.data.tousLesTache.length,this.data.tousLesTache.length,0,0]
    const ideal = [0,0,this.data.tousLesTache.length,this.data.tousLesTache.length]
    
    

    const ctx = document.getElementById('radar-chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Mon performance',
            data: values,
            backgroundColor: 'rgba(29,140,248,0.2)',
            borderColor: 'rgba(29,140,248,1)',
            borderWidth: 1,
          },
          {
            label: 'faible Performance',
            data:faiblePerformance,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Performance élevé',
            data:ideal,
            backgroundColor: 'rgba(66,134,121,0.15)',
            borderColor: 'rgba(66,134,121,1)',
            borderWidth: 1,
          },
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        responsive: true,
        borderRadius: 10,
        shadowBlur: 10,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Etat ticket Tâche',
        },
        legend: {
          fontFamily: 'Cursive',
          position: 'bottom',
        },
        scale: {
          pointLabels: {
            fontFamily: 'Serif',
            fontSize: 14,
            fontColor: '#666666',
          },
          
          ticks: {
            beginAtZero: true,
          },
        },
      },
    })
    
  }

}
