import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Membre } from 'src/app/model/membre';
import { TicketHistoire } from 'src/app/model/ticket-histoire';
import { ChartDataSets, ChartOptions, ChartType ,Chart} from 'chart.js';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import { RoleService } from 'src/app/service/role.service';
import { TacheTicket } from 'src/app/model/tache-ticket';
import { Role } from 'src/app/model/role';
import { Observable, forkJoin } from 'rxjs';
import { StatCourbComponent } from '../stat-courb/stat-courb.component';

export interface ChartDialog{
  membre:Membre,
  histoire:TicketHistoire
}
@Component({
  selector: 'app-chart-parcours',
  templateUrl: './chart-parcours.component.html',
  styleUrls: ['./chart-parcours.component.scss']
})
export class ChartParcoursComponent implements OnInit{


  bubbleChartData: ChartDataSets[] = [];
  sprintId:number = this.data.id;

  colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)', 
    'rgba(75, 192, 192, 0.8)', 
    'rgba(153, 102, 255, 0.8)', 
    'rgba(255, 159, 64, 0.8)'
  ];


  bubbleChartLegend = true;
  
  bubbleChartPlugins = [];
  chart: Chart 
  listMembre: Membre[];

  //tache qui appartient au histoire
  listTicketHistoire:TacheTicket[]=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialog,
    private roleService: RoleService,
    private ticketTacheService: TicketTacheService
  ){}

   generateColors(numColors) {
    let colors = [];
  
    for (let i = 0; i < numColors; i++) {
      let color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
      colors.push(color);
    }
  
    this.colors = colors
  }

  taches:TacheTicket[]

  ngOnInit(): void {
    const idProjet = JSON.parse(localStorage.getItem('projet')).id
    console.log(idProjet);
    
    const ticketsObservable: Observable<TacheTicket[]>= this.ticketTacheService.getTicketsTacheBySprint(this.sprintId)
    const roleObservable:Observable<Role[]> = this.roleService.afficherListRoleParProjet(idProjet);

    // Utilisation de forkJoin pour attendre la récupération de toutes les données
   
    forkJoin([roleObservable, ticketsObservable])
  .subscribe(
    ([roles,tickets])=>{
      //recuoerer les membre par role
      const membres:Membre[] = []
      let tableHistoire:TacheTicket[] = []
      this.taches = tickets
      const tableHistoireId = Array.from(new Set(tickets.map((ticket) => ticket.ht.id)));
      console.log("tab: ",tableHistoireId);
      
      for(let tabId of tableHistoireId)
       tableHistoire.push(tickets.find(ticket=>ticket.ticketHistoireId == tabId))
      console.log(tableHistoire);
      this.listTicketHistoire = tableHistoire
      this.generateColors(roles.length);
      for(let role of roles){
        if(role.status == "ACCEPTE" && role.type=="dev team")
          membres.push(role.membre)
      }
        this.listMembre = membres
        console.log(membres);
        const bubbleChartData = [];
        for(let i =0;i<membres.length;i++){
          let memberData
          console.log(tableHistoire);
          memberData = { data: [], label: membres[i].email, backgroundColor: this.colors[i], borderColor: this.colors[i] };
          
          for(let ticketTache of tickets){
            if(memberData.data.find(axe => axe.y == ticketTache.ht.id) ){
              continue
            }else if(ticketTache.membreId == membres[i].id){
              memberData.data.push({ x: i, y: ticketTache.ht.id,r:5});
            }

          }
          bubbleChartData.push(memberData);
        }
     
      const maxIdHistoire = Math.max(...tableHistoireId)
      let minIdHistoire = Math.min(...tableHistoireId)
      if(tableHistoire.length <=1)
        minIdHistoire-=1
      //conf
      const chartOptions = {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Histoire de ticket'
            },
            ticks: {
              stepSize: 1 ,
              beginAtZero: false,
              min: minIdHistoire, // La première valeur sera 0
              max:maxIdHistoire,
              maxTicksLimit:tableHistoire.length , 
              callback :(value, index, values) => { // Personnalisation des labels
                return tableHistoire.find(tache => tache.ticketHistoireId == value)?.ht.titre;
              }
            },
            gridLines: { 
              display:true,
              drawBorder: true,
              color: 'rgba(200, 200, 200, 0.2)',
              drawOnChartArea: true,
              drawTicks: true 
             }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Membre'
            },
            ticks: {
              stepSize: 1 ,
              beginAtZero: false,
              min: 0, // La première valeur sera 0
              max:membres.length,
              callback :(value, index, values) => { // Personnalisation des labels
                return membres[index]?.email;
              }
            },
            gridLines: { 
              display:true,
              drawBorder: true,
              color: 'rgba(200, 200, 200, 0.2)',
              drawOnChartArea: true,
              drawTicks: true 
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const memberName = membres[value.x].email;
              
              const tacheFiltred = this.taches.filter(t => t.ht.id == value.y && t.membreId == this.listMembre[value.x].id)
              console.log(this.taches);
              
              return `${memberName} -> nombre de Tâche ${tacheFiltred.length}`;
            }
          }
        },
        
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 10,
            backgroundColor: '',
            borderWidth: 0,
            borderColor: 'transparent',
            pointStyle: 'mat-icon', 
            icon: 'person',
            fontColor: 'white', // couleur de la légende
            fontSize: 20, // taille de l'icône
            fontStyle: 'normal', // style de l'icône
         }
         
        },
        onClick: this.handleChartClick.bind(this)
      };
     
      //creation 
      this.canvas = document.getElementById("bubble-chart");
      this.ctx = this.canvas.getContext("2d");
      
      this.chart = new Chart(this.ctx, {
        type: 'bubble',
        data: {
          datasets: bubbleChartData
        },
        options: chartOptions
      });
      
     
    
    }
  )

  }
  public canvas : any;
  public ctx;

  handleChartClick(event, array) {
    const elements = this.chart.getElementAtEvent(event);
   
    let member;
    let ticketHistoire;
    if (elements.length > 0) {
      //pour l'axe des x 
      const datasetIndex = elements[0]._datasetIndex;

      //pour l'axe des y
      const dataIndexYaxe = elements[0]._index;
      //affectation des valuer
      member = this.listMembre[datasetIndex]
      
      
      
      ticketHistoire = this.listTicketHistoire[dataIndexYaxe].ht 
    }
    console.log("membre :",member);
    console.log(this.listMembre);
    console.log("histoire :",ticketHistoire);
    if (array.length > 0) {
      const dialogRef = this.dialog.open(StatCourbComponent, {
        width: '650px',
        height:'570px',
        data: { 
          membre: member,
          histoire:ticketHistoire
        }
      });
    }
  }

}
