// import { Component,Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { TicketTacheService } from 'src/app/service/ticket-tache.service';
// import { DialogDataTicketTache } from '../../map/map.component';
// import { CorbeilleService } from 'src/app/service/corbeille.service';
// import { TacheTicket } from 'src/app/model/tache-ticket';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-ajout-tache-spb',
//   templateUrl: './ajout-tache-spb.component.html',
//   styleUrls: ['./ajout-tache-spb.component.scss']
// })
// export class AjoutTacheSpbComponent implements OnInit {

//   constructor(
//     private ticketTacheService: TicketTacheService,
//     private corbeilleService:CorbeilleService,
//     public dialogRef: MatDialogRef<AjoutTacheSpbComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogDataTicketTache,
//     private fb:FormBuilder
//   ){}

//   ticketTacheForm: FormGroup;

//   ngOnInit(): void {
//     const membre = JSON.parse(localStorage.getItem('membre'))
//     this.ticketTacheForm = this.fb.group({
//       nbHeurs: [null,Validators.required],
//       titre: ['',Validators.required],
//       sprintBacklogId:this.data.sprintBacklog.id,
//       ticketHistoireId:this.data.ticketHistoire.id,
//       etat:"à faire",
//       dateLancement:new Date(),
//       dateFin:this.data.ticketHistoire.dateFin,
//       membreId:membre.id,
//       description: [null, Validators.required],
//     });
//   }


//   ajouterTicketTacheAuSpb(){
//     const membre = JSON.parse(localStorage?.getItem('membre'));
//     const tacheAdd:TacheTicket = this.ticketTacheForm.value
//     const productBacklog = JSON.parse(localStorage?.getItem('productBacklogCourant'));
//     this.corbeilleService.getTacheCorbeilleByMembreId(membre.id).subscribe(
//       dataCorbeille => {
//         dataCorbeille = dataCorbeille.filter(tache => tache.ht.productBacklogId == productBacklog.id)
//         const findTache = dataCorbeille.find(tache => tache.titre == tacheAdd.titre && tache.description == tacheAdd.description)
//         if(findTache)
//             Swal.fire({
//               title: "cette tâche existe déjà dans votre corbeille \n elle va être ajouter ;",
//               icon: 'info',
//               showCancelButton: true,
//               confirmButtonColor: '#3085d6',
//               cancelButtonColor: '#d33',
//               confirmButtonText: 'Oui, Lancer!',
//               cancelButtonText: 'Annuler',
//               backdrop: 'rgba(0,0,0,0.4)',
//               allowOutsideClick: false,
//               allowEscapeKey: false,
//               allowEnterKey: false,
//               focusConfirm: false
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 this.corbeilleService.deleteTacheFromCorbeille(findTache.id,"local").subscribe(
//                   data => {
//                     this.dialogRef.close(findTache);
//                   }
//                 );
//               }else{
//                 Swal.fire(
//                   'insertion annulé',
//                   'Cette tâche existe dans votre corbeille.',
//                   'error'
//                 )
//               }
//             })
//         else
//             this.ticketTacheService.ajouterTicketTache(tacheAdd).subscribe(
//               data => {
//                 this.ticketTacheService.affecterTicketAMembre(membre,data.id).subscribe(
//                   dataApresAffectation =>{
//                     console.log('ticket = ',dataApresAffectation);
//                     data.dateLancement = dataApresAffectation.dateLancement
//                     data.membre = dataApresAffectation.membre
//                     data.membreId = dataApresAffectation.membreId
//                     console.log('tache= ',data)
//                   }
//                 )
//                 this.dialogRef.close(data);
//               },
//               error =>{
//                 Swal.fire(
//                   'insertion annulé',
//                   'vous avez déjà cette ticket tâche.',
//                   'error'
//                 )
//               }
//             )
//       }
//     )





//   }

// }


import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import { DialogDataTicketTache } from '../../map/map.component';
import { CorbeilleService } from 'src/app/service/corbeille.service';
import { TacheTicket } from 'src/app/model/tache-ticket';
import Swal from 'sweetalert2';
import { MembreService } from 'src/app/service/membre.service';

@Component({
  selector: 'app-ajout-tache-spb',
  templateUrl: './ajout-tache-spb.component.html',
  styleUrls: ['./ajout-tache-spb.component.scss']
})
export class AjoutTacheSpbComponent implements OnInit {

  constructor(
    private ticketTacheService: TicketTacheService,
    private corbeilleService:CorbeilleService,
    public dialogRef: MatDialogRef<AjoutTacheSpbComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTicketTache,
    private fb:FormBuilder,
    private membreService:MembreService
  ){}

  ticketTacheForm: FormGroup;

  ngOnInit(): void {
    const membre = this.membreService.getMembreFromToken();
    this.ticketTacheForm = this.fb.group({
      nbHeurs: [null,Validators.required],
      titre: ['',Validators.required],
      sprintBacklogId:this.data.sprintBacklog.id,
      ticketHistoireId:this.data.ticketHistoire.id,
      etat:"à faire",
      dateLancement:new Date(),
      dateFin:this.data.ticketHistoire.dateFin,
      membreId:membre.id,
      description: [null, Validators.required],
    });
  }


  ajouterTicketTacheAuSpb(){
    const membre = this.membreService.getMembreFromToken();
    const tacheAdd:TacheTicket = this.ticketTacheForm.value
    const productBacklog = JSON.parse(localStorage?.getItem('productBacklogCourant'));
    this.corbeilleService.getTacheCorbeilleByMembreId(membre.id).subscribe(
      dataCorbeille => {
        dataCorbeille = dataCorbeille.filter(tache => tache.ht.productBacklogId == productBacklog.id)
        const findTache = dataCorbeille.find(tache => tache.titre == tacheAdd.titre && tache.description == tacheAdd.description)
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
                    this.dialogRef.close(findTache);
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
            this.ticketTacheService.ajouterTicketTache(tacheAdd).subscribe(
              data => {
                this.ticketTacheService.affecterTicketAMembre(membre,data.id).subscribe(
                  dataApresAffectation =>{
                    console.log(dataApresAffectation);
                    data.dateFin = dataApresAffectation.dateFin
                    data.dateLancement = dataApresAffectation.dateLancement
                    data.membre = dataApresAffectation.membre
                    data.membreId = dataApresAffectation.membreId
                    this.dialogRef.close(data);
                  }
                )
              },
              error =>{
                Swal.fire(
                  'insertion annulé',
                  'vous avez déjà cette ticket tâche.',
                  'error'
                )
              }
            )
      }
    )





  }

}
