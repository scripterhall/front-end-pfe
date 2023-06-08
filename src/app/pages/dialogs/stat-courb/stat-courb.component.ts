import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartDialog } from '../../histoire-membre-chart/histoire-membre-chart.component';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import { TacheTicket } from 'src/app/model/tache-ticket';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-stat-courb',
  templateUrl: './stat-courb.component.html',
  styleUrls: ['./stat-courb.component.scss']
})
export class StatCourbComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatCourbComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartDialog,
    private ticketTacheService: TicketTacheService){}
    barChart:Chart;
    ticketsTache:TacheTicket[]


  ngOnInit(): void {
    this.ticketTacheService.getTicketsTacheByMembreId(this.data.membre.id).subscribe(
      data => {
        data = data.filter(tt => tt.ht.id == this.data.histoire.id)

        this.ticketsTache = data;
        //tableau des titre
        const ticketTitres = this.ticketsTache.map(ticket => ticket.titre);
        //tableau des Heurs
        const ticketHeurs =  this.ticketsTache.map(ticket => ticket.nbHeurs);
        //couleur pour chaque ticket
        const barColors = this.ticketsTache.map(ticket =>{
          const r = Math.floor(Math.random() *255);
          const g = Math.floor(Math.random() *255);
          const b = Math.floor(Math.random() *255);
          return `rgba(${r},${g},${b},0.2)`;
        })

        //Configuration de chart bar
        const barChartConfig = {
          type: 'bar',
          data: {
            labels: ticketTitres,
            datasets: [{
              label: 'mes tâche pour cette ticket histoire',
              data: ticketHeurs,
              backgroundColor: barColors,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  stepSize: 1, // Vous pouvez changer le stepSize selon vos préférences
                }
              }]
            },
            animation: { // Options d'animation
              duration: 1000, // Durée de l'animation (en millisecondes)
              easing: 'linear', // Type d'animation
            },
            events: [], // Désactiver les événements de click pour éviter des bugs d'animation
            responsiveAnimationDuration: 0, // Désactiver l'animation responsive
          },

        };
        // Création du graphique à barres
       this.barChart = new Chart(document.getElementById("avencement"), barChartConfig);

       //this.initialiserChartZero()

       this.ticketsTache.forEach(
        (tache,index)=>{
          const progressBar = setInterval(() => {
            if (this.barChart.data.datasets[0].data[index] >= tache.nbHeurs) {
              clearInterval(progressBar);
            } else {
              //pour incrementer la nombre heurs de 1 data[index]
              this.barChart.data.datasets[0].data[index]++;
              this.barChart.update();
            }
          }, 1000*3600/tache.nbHeurs);
        });
        }
       )


  }


  initialiserChartZero(){
    this.barChart.data.datasets.forEach(dataset => {

      dataset.data =  this.ticketsTache.map(tache => 0);
    })
  }


}
