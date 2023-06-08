import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/model/sprint';
import { TacheTicket } from 'src/app/model/tache-ticket';
import { ProductBacklogService } from 'src/app/service/product-backlog.service';
import { SprintService } from 'src/app/service/sprint.service';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import Sortable from 'sortablejs';
import Swal from 'sweetalert2';
import { Membre } from 'src/app/model/membre';
import { MembreService } from 'src/app/service/membre.service';

@Component({
  selector: 'app-scrum-board',
  templateUrl: './scrum-board.component.html',
  styleUrls: ['./scrum-board.component.scss']
})
export class ScrumBoardComponent implements OnInit {
  staticAlertClosed  = false;
  staticAlertClosed1 = false;
  staticAlertClosed2 = false;
  staticAlertClosed3 = false;
  staticAlertClosed4 = false;
  staticAlertClosed5 = false;
  staticAlertClosed6 = false;
  staticAlertClosed7 = false;


  constructor(private toastr: ToastrService, private ticketTacheService:TicketTacheService,
    private productBacklogService:ProductBacklogService, private sprintService:SprintService,
    private membreService:MembreService
    ) {}

  ticketsTache: TacheTicket[]=[];
  sprints:Sprint[];
  movedElementId: string = '';
  etat:string;
  lastEtat:string;
  selectedSprintId: number;
  public searchMember: string;


  showNotification(from, align){

    const color = Math.floor((Math.random() * 5) + 1);

    switch(color){
      case 1:
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
         disableTimeOut: true,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-info alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 2:
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
         disableTimeOut: true,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 3:
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
         disableTimeOut: true,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-warning alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 4:
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
         disableTimeOut: true,
         enableHtml: true,
         closeButton: true,
         toastClass: "alert alert-danger alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
       break;
       case 5:
       this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
      break;
      default:
      break;
    }
}

ngOnInit() {
  this.sprintService.getListSprintsByProductBacklog(this.productBacklogService.getProductBacklogByIdFromLocalStorage()).subscribe(
    data => {
      this.sprints = data;

      // Recherche du sprint "en cours"
      const sprintEnCours = this.sprints.find(sprint => sprint.etat === 'en cours');

      // Si aucun sprint "en cours" n'est trouvé, sélectionner le premier sprint
      if (sprintEnCours) {
        this.selectedSprintId = sprintEnCours.id;
        this.getTicketsTacheBySprint(this.selectedSprintId);
      } else if (this.sprints.length > 0) {
        this.selectedSprintId = this.sprints[0].id;
        this.getTicketsTacheBySprint(this.selectedSprintId);
      }
    },
    error => {
      console.log(error.status);
      
      if (error.status == 401)
        Swal.fire(
          'Attention',
          'Vous n\'avez pas une autorisation',
          'error'
        )
    }
  );
}

getTicketsTacheBySprint(sprintId: number) {
  if (sprintId) {
    this.ticketTacheService.getTicketsTacheBySprint(sprintId).subscribe(tickets => {
      this.ticketsTache = tickets;
      console.log(this.ticketsTache);
    });
  } else {
    this.ticketsTache = null;
  }
}

filterTicketsTache() {
  if (this.selectedSprintId) {
    if (this.searchMember) {
      // Filtrer les tickets tâche en fonction du membre saisi
      this.ticketsTache = this.ticketsTache.filter(tache => {
        // Comparer avec le membre du ticket tâche
        return tache.membre && (tache.membre.nom.includes(this.searchMember) || tache.membre.prenom.includes(this.searchMember) || tache.membre.email.includes(this.searchMember));
      });
    } else {
      // Aucun membre saisi, afficher toutes les tâches
      this.getTicketsTacheBySprint(this.selectedSprintId);
    }
  }
}





ngAfterViewInit() {
  const cardBodies = document.querySelectorAll('.card-body');
  const myArray = Array.from(cardBodies);
  for (const body of myArray) {
  const sortable = new Sortable(body, {
  group: 'shared',
  animation: 150,
  onEnd: (evt) => {
  console.log('Moved item', evt.item, 'from index', evt.oldIndex, 'to index', evt.newIndex);
  console.log('Target element ID:',evt.to.id);
  }
  });
  }
  }

  onDrop(event: DragEvent, tache: any) {
    const targetElement = event.target as Element;
    const containerElement = targetElement.closest('.card-body') as HTMLElement;
    const containerId = containerElement.getAttribute('id');
    console.log('Nouvel etat du ticket tâche: ', containerId);
    console.log(tache);
    if(tache.membreId!=null){
    tache.etat = containerId;
    this.ticketTacheService.modifierTicketTache(tache).subscribe(
        (modifiedTicket: TacheTicket) => {
            console.log('Ticket tâche déplacé:', modifiedTicket);
        },
        (error: any) => {
            console.error('Erreur: ', error);
        });
  }
}




onDragEnd(event:DragEvent,tache:TacheTicket){
  console.log(tache);
  if(tache.membreId==null){

    this.toastr.error(`Cette ticket n'a pas de membre`);
    window.location.reload();
  }
}

prendreTicket(idTicketTache:number){
  const  ticket = this.ticketsTache.find(tache=>tache.id === idTicketTache)
  Swal.fire({
    title: "vous êtes sûr de prendre la tâche : "+ticket.titre,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, Lancer!',
    cancelButtonText: 'Annuler',
    background:'rgba(0,0,0,0.9)',
    backdrop: 'rgba(0,0,0,0.4)',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false
  }).then((result) => {
    if (result.isConfirmed) {
      const membre = this.membreService.getMembreFromToken();
      this.ticketTacheService.affecterTicketAMembre(membre,idTicketTache).subscribe(
      dataTicket=>{
          this.ticketsTache.forEach(ticket=>{
            if(ticket.id == idTicketTache){
              ticket.dateFin = dataTicket.dateFin
              ticket.dateLancement = dataTicket.dateLancement
              ticket.membre = dataTicket.membre
              ticket.membreId = dataTicket.membreId
              Swal.fire(
                'tâche pris',
                'Vous êtes le responsable de cette tâche vieulliez à ce quelle soit terminé dans '+ticket.nbHeurs+"H",
                'success'
              )
            }
          })
      },
      error => {
        console.log(error.status);
        
        if (error.status == 401)
          Swal.fire(
            'Attention',
            'Vous n\'avez pas une autorisation',
            'error'
          )
      }
    )

    }
   }
  );


}

verifierPersPris(membre:Membre){
  const prendre = "Cette tâche est prise par "
  if(this.membreService.getMembreFromToken().id == membre.id)
    this.toastr.success(`${prendre} vous 😀`);
  else
    this.toastr.success(`${prendre} ${membre.email}`);
}


}


