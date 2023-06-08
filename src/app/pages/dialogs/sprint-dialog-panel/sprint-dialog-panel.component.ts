import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projet } from 'src/app/model/projet';
import { SprintBacklog } from 'src/app/model/sprint-backlog';
import { TacheTicket } from 'src/app/model/tache-ticket';
import { TicketHistoire } from 'src/app/model/ticket-histoire';
import { HistoireTicketService } from 'src/app/service/histoire-ticket.service';
import { SprintBacklogService } from 'src/app/service/sprint-backlog.service';
import { SprintService } from 'src/app/service/sprint.service';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import Swal from 'sweetalert2';
import { DialogData } from '../../icons/icons.component';
import { CorbeilleService } from 'src/app/service/corbeille.service';
import { WebSocketTicketTacheService } from 'src/app/service/web-socket-ticket-tache.service';
import { Membre } from 'src/app/model/membre';
import { MembreService } from 'src/app/service/membre.service';
import { WebSocketSprintService } from 'src/app/service/web-socket-sprint.service';



@Component({
  selector: 'app-sprint-dialog-panel',
  templateUrl: './sprint-dialog-panel.component.html',
  styleUrls: ['./sprint-dialog-panel.component.scss']
})
export class SprintDialogPanelComponent implements OnInit{

  @ViewChild('tacheDetails') myDetails: ElementRef;
  @ViewChild('calendar') calendarLancement: ElementRef;
  @ViewChild('calendarFin') calendarFin: ElementRef;

  ticketTacheList:TacheTicket[]
  projet:Projet;
  ticketTacheForm: FormGroup;
  constructor( public dialogRef: MatDialogRef<SprintDialogPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb:FormBuilder,
    private corbeilleService:CorbeilleService,
    private sprintService:SprintService,
    private webSocketTache:WebSocketTicketTacheService,
    private ticketTacheService:TicketTacheService,
    private histoireTicketService:HistoireTicketService,
    private sprintBacklogService:SprintBacklogService,
    private membreService:MembreService,
    private webSocketSprintService:WebSocketSprintService
    ){
      this.webSocketTache.messageHandlingAdd(null).subscribe(
        message =>{
          console.log(message);
          if(message.subscribe && this.data.TicketHistoires.find(histoire => histoire.id == message.subscribe.ht.id)){
            this.ticketTacheList.push(message.subscribe);
          }
        },
        error =>{
          console.log(error);
        }
      )

      this.webSocketTache.messageHandlingSupprimer(null).subscribe(
        message =>{
          if(message.supprimer){
            this.ticketTacheList.splice(this.ticketTacheList.indexOf(this.ticketTacheList.find(tache=>tache.id == message.supprimer.id)),1)
          }
        },
        error => {
          console.log(error);
        }
      )
    }

    TicketTacheModif:FormGroup;
    membre:Membre;
    role:String;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');


    console.log(this.data.sprint);
    console.log(this.data.TicketHistoires);
    this.membre = this.membreService.getMembreFromToken();
    this.projet = JSON.parse(localStorage.getItem("projet"))
    this.TicketTacheModif = this.fb.group({
      id: ['', Validators.required],
      nbrHeurs: ['', Validators.required],
      membreId:[],
      SprintBacklogId: [],
      etat:[]
    })

    this.ticketTacheForm = this.fb.group({
      nbHeurs: [null,Validators.required],
      titre: ['',Validators.required],

      description: [null, Validators.required],
    });
    const conv_data = new Date(this.data.sprint.dateLancement);
    console.log(this.data.canStart);
    if(conv_data.getDay() == new Date().getDay()
      && this.data.sprint.etat != "en cours"
      && !this.data.canStart
      &&this.data.TicketHistoires.length>0
      ){
        Swal.fire({
          title: "en appuyant sur le boutton <ok> votre sprint sera lancé avec la date "+conv_data.toDateString(),
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
            // Le code à exécuter si l'utilisateur a cliqué sur "Oui, supprimer!"
            this.lancerSprint()
            location.reload()
            Swal.fire(
              'succes de Lancement',
              'Votre sprint a été lancé.',
              'success'
            )
          }
        });
    }

  }
  ajouterTick = false;

  //afficher tous les ticket tâche d'un ticket histoire
  afficherTicketTache(ht:TicketHistoire){

    this.ticketTacheService.getListTicketTacheParHt(ht.id).subscribe(
      data=>{
        console.log(data);
        this.ticketTacheList = data ;
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

  isOpen = false;
  showDetailSprint(){
    this.isOpen = !this.isOpen
  }

  modifActif=false;

  //detacher ticket histoire de sprint
  detacherHt(ht:TicketHistoire,i:number){
    console.log(ht.sprint);

    if(confirm('vous êtes sur de detacher cette ticket histoire de sprint')){
      ht.sprintId = null
      ht.sprint.velocite -= ht.effort
      this.histoireTicketService.DetacherHtSprint(ht).subscribe(
        dataHt =>{
            this.data.TicketHistoires.splice(i,1)
            //decrementation de velocite de sprint
            this.sprintService.modifierSprint(ht.sprint).subscribe(
              sprintData =>{
                this.data.sprint.velocite = sprintData.velocite
              }
            )
        }
      )
    }

  }

  changeSprint:FormGroup;
  showModif(){
    // console.log(this.data.sprint.productBacklogId)
    this.changeSprint = this.fb.group({
      objectif: [this.data.sprint.objectif,Validators.required],
    })
    this.modifActif = !this.modifActif
  }

  //valider date fin
  validateDateFin(control: AbstractControl): {[key: string]: any} | null {
    const dateLancement = new Date(control.parent?.get('dateLancement').value);
    const dateFin = new Date(control.value);
    if (dateLancement && dateFin && dateLancement >= dateFin) {
      return { 'dateFinInvalide': true };
    }
    return null;
  }

  listEtat = [
    "terminer",
    "a faire",
    "a verifier",
    "en cours"
  ]

  //modifier sprint detail
  terminerChangement(){
      Swal.fire({
        title: "Êtes-vous sûr d'effectuer des modifications sur ce Sprint ?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Lancer!',
        cancelButtonText: 'Annuler',
        backdrop: 'rgba(0,0,0,0.4)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusConfirm: false
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.data.sprint.productBacklogId)
          this.data.sprint.productBacklogId = this.data.sprint.productBacklog.id
          this.data.sprint.etat = 'en attente'
          this.data.sprint.objectif = this.changeSprint.get('objectif').value
          this.sprintService.modifierSprint(this.data.sprint).subscribe(
            data =>{
              console.log(data);
              data.productBacklog = this.data.sprint.productBacklog 
              this.data.sprint = data;
              this.modifActif = false;
              this.webSocketSprintService.messageHandlingModifier(data).subscribe()
            }
          )
        } 
      });
  }

  //afficher le formualire d'ajout
  showFormAjout(){
    this.ajouterTick = !this.ajouterTick
  }

  //ajouter une ticket tache dans le panel de detail sprint
  ajouterTicketTache(ht:TicketHistoire){
    const membre = this.membreService.getMembreFromToken();
    console.log(this.ticketTacheForm.value)
    let ticketTache:TacheTicket = this.ticketTacheForm.value
    ticketTache.ht = ht
    ticketTache.sprintBacklogId = null
    ticketTache.ticketHistoireId = ht.id;
    ticketTache.membreId = membre.id;
    ticketTache.membre = membre;
    console.log(ticketTache);
    const productBacklog = JSON.parse(localStorage?.getItem('productBacklogCourant'));
    this.corbeilleService.getTacheCorbeilleByMembreId(membre.id).subscribe(
      dataCorbeille => {
        dataCorbeille = dataCorbeille.filter(tache => tache.ht.productBacklogId == productBacklog.id)
        const findTache = dataCorbeille.find(tache => tache.titre == ticketTache.titre && tache.description == ticketTache.description)
        if(findTache)
            Swal.fire({
              title: "cette tâche existe déjà dans votre corbeille \n elle va être ajouter ;",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Oui, Lancer!',
              cancelButtonText: 'Annuler',
              backdrop: 'rgba(0,0,0,0.4)',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              focusConfirm: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.corbeilleService.deleteTacheFromCorbeille(findTache.id,"local").subscribe(
                  data => {
                    this.webSocketTache.messageHandlingAdd(findTache).subscribe()
                  }
                );
              }else{
                Swal.fire(
                  'insertion annulé',
                  'Cette tâche existe dans votre corbeille.',
                  'error'
                )
              }
            })
        else
          ticketTache.dateLancement = ht.dateDebut;
          ticketTache.dateFin = ht.dateFin;
          ticketTache.etat = 'à faire';
          this.ticketTacheService.ajouterTicketTache(ticketTache).subscribe(
            data =>{
              console.log(data);
              this.ticketTacheService.affecterTicketAMembre(membre,data.id).subscribe(
                dataTicket=>{
                  console.log("affecter : ",dataTicket);
                  this.webSocketTache.messageHandlingAdd(dataTicket).subscribe()
                  this.ajouterTick = false;
                  this.ticketTacheForm.reset()
                })

            },
            error => {
              Swal.fire(
                'erreur d\'insertion',
                'vous avez déjà une ticket avec ce titre et cette description',
                'error'
              )
              this.ticketTacheForm.reset()
      }
    )
  })
}

  //supprimer une ticket tache dans le panel de details sprint
  supprimerTicketTache(i:number){
    console.log(this.ticketTacheList[i].id);
    if(confirm('vous êtes sur de supprimer cette tâche !'))
      this.ticketTacheService.supprimerTicketTache(this.ticketTacheList[i].id).subscribe(
        data =>{
          this.webSocketTache.messageHandlingSupprimer(this.ticketTacheList[i]).subscribe()
        }
      )
  }



  //lancer le sprint et generer un sprintBacklog avec force
  lancerSprintForcer(){
    console.log(this.data.canStart);
    if(
    this.data.sprint.etat != "en cours"
    && !this.data.canStart
    &&this.data.TicketHistoires.length>0
    ){
    Swal.fire({
      title: "en appuyant sur le boutton <ok> votre sprint sera lancé avec la date "+this.data.sprint.dateLancement.toDateString(),
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
        // Le code à exécuter si l'utilisateur a cliqué sur "Oui, supprimer!"
        this.lancerSprint()
        Swal.fire(
          'succes de Lancement',
          'Votre sprint eest lancé .',
          'success'
        )
        location.reload()
      }
    });
  }else{
    Swal.fire(
      'erreur de Lancement',
      'Votre sprint ne peut pas être lancé .',
      'error'
    )
  }

  }


  //lancerNormalment le sprint dans la date de lancement

  lancerSprint(){
    console.log(this.data.sprint);
    this.data.sprint.etat = "en cours"
    this.data.sprint.productBacklogId = this.data.sprint.productBacklog.id
    this.sprintService.modifierSprint(this.data.sprint).subscribe(dataSprint =>{
      console.log(dataSprint);
     
      let  sprintBacklog = new SprintBacklog();
     
      sprintBacklog.sprint = dataSprint
      sprintBacklog.sprintId = this.data.sprint.id
      this.data.TicketHistoires.forEach(ht =>{
        ht.status = "EN_COURS"
        ht.dateDebut = this.data.sprint.dateLancement
        ht.dateFin = this.data.sprint.dateFin
        this.histoireTicketService.updateUserStory(ht.id,ht).subscribe(
          data =>{
            console.log(data);
          }
        )
      })
      console.log("spb  : ",sprintBacklog);
      this.sprintBacklogService.genererSprintBacklog(sprintBacklog).subscribe(
         dataSpBacklog =>{
          console.log(dataSpBacklog);
           
            for(let i=0;i<this.data.TicketHistoires.length;i++){
              this.ticketTacheService.getListTicketTacheParHt(this.data.TicketHistoires[i].id).subscribe(
                data =>{
                  this.ticketTacheList = data
                  for(let j= 0;j<this.ticketTacheList.length;j++){
                  
                    this.ticketTacheList[j].sprintBacklogId = dataSpBacklog.id
                    this.ticketTacheList[j].etat = "à faire"
                    this.ticketTacheList[j].sprintBacklog = dataSpBacklog
                    this.ticketTacheList[j].dateLancement = this.data.TicketHistoires[i].dateDebut
                    this.ticketTacheList[j].dateFin = this.data.TicketHistoires[i].dateFin
                    this.ticketTacheService.modifierTicketTache(this.ticketTacheList[j]).subscribe(
                      ttData=>{
                        console.log(ttData);

                      }
                    )
                  }
                }
              )
            }
            
            
        }
        
      )
    })

  }

  //Supprimer le sprint
  supprimerSprint(){
    console.log(this.data.sprint.id);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez ce sprint!',
      background:'rgba(0,0,0,0.9)',
      backdrop: 'rgba(0,0,0,0.4)',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.data.TicketHistoires.length>0){
          for(let i = 0;i<this.data.TicketHistoires.length;i++){
            this.detacherHt(this.data.TicketHistoires[i],i)
          }
        }
        this.sprintService.supprimerSprint(this.data.sprint.id).subscribe(
          data =>{
            console.log(data)
            this.dialogRef.close(this.data.sprint)
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
        Swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    })

  }

  verifDate(){
    const aujourdhui = new Date()
    this.data.sprint.dateLancement= new Date( this.data.sprint.dateLancement)
    return  this.data.sprint.dateLancement.getFullYear() === aujourdhui.getFullYear() &&
    this.data.sprint.dateLancement.getMonth() === aujourdhui.getMonth() &&
    this.data.sprint.dateLancement.getDate() === aujourdhui.getDate()
  }



}
