import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketTacheService } from 'src/app/service/ticket-tache.service';
import Swal from 'sweetalert2';
import { DialogGererDataTicketTache } from '../../map/map.component';
import { Membre } from 'src/app/model/membre';
import { MembreService } from 'src/app/service/membre.service';

@Component({
  selector: 'app-gestion-tache-dialog',
  templateUrl: './gestion-tache-dialog.component.html',
  styleUrls: ['./gestion-tache-dialog.component.scss']
})
export class GestionTacheDialogComponent implements OnInit {

  membre: Membre
  constructor(
    private membreService: MembreService,
    public dialogRef: MatDialogRef<GestionTacheDialogComponent>,
    private ticketTacheService: TicketTacheService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogGererDataTicketTache
  ) { }
  ngOnInit(): void {
    this.membre = this.membreService.getMembreFromToken();
    console.log(this.data.ticketTache);
    this.modifTicketForm = this.fb.group({
      id: this.data.ticketTache.id,
      nbHeurs: [this.data.ticketTache.nbHeurs, Validators.required],
      titre: [this.data.ticketTache.titre, Validators.required],
      sprintBacklogId: this.data.ticketTache.sprintBacklogId,
      ticketHistoireId: this.data.ticketTache.ticketHistoireId,
      etat: this.data.ticketTache.etat,
      description: [this.data.ticketTache.description, Validators.required],
      membreId: this.data.ticketTache.membreId,
      dateLancement: this.data.ticketTache.dateLancement,
      dateFin: this.data.ticketTache.dateFin,
      ht: this.data.ticketTache.ht
    });
  }

  openForm: boolean = false
  modifTicketForm: FormGroup

  terminerTache() {
    console.log(this.data.ticketTache);
    if (this.membre.id == this.data.ticketTache.membreId) {
      this.data.ticketTache.etat = "terminé"
      this.data.ticketTache.dateFin = new Date()
      this.ticketTacheService.modifierTicketTache(this.data.ticketTache).subscribe(
        data => {
          console.log("voici ticket retourner :", data);
          data.ht.sprintId = data.sprintBacklog.sprintId
          Swal.fire(
            'bon travail :)',
            'tâche terminer',
            'success',
          )
          const terminerData = {
            mode: 'terminer',
            tt: data
          }
          this.dialogRef.close(terminerData);
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
    } else {
      Swal.fire(
        'Impossible de terminer cette tâche',
        'Il n\'existe pas un membre pour cette ticket tâche où elle ne t\'appartient pas',
        'error',
      )
    }
  }

  modifierTache() {
    if (this.membre.id == this.data.ticketTache.membreId)
      Swal.fire({
        title: "vous êtes sûr d'efectuer des modification sur cette tâche &#128512;",
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
          // Le code à exécuter si l'utilisateur a cliqué sur "Oui, supprimer!"
          this.ticketTacheService.modifierTicketTache(this.modifTicketForm.value).subscribe(
            data => {
              Swal.fire(
                'tâche modifié',
                'Cette tâche a été modifié.',
                'success'
              )
              const modifData = {
                mode: 'modifier',
                tt: this.modifTicketForm.value
              }
              this.dialogRef.close(modifData);
            },
            error => {
              Swal.fire(
                'tâche non modifié',
                'vous n\'avez rien changer où il ya une \nautre tâche equivalente a cette derniére',
                'warning'
              )

              if (error.status == 401)
                Swal.fire(
                  'Attention',
                  'Vous n\'avez pas une autorisation',
                  'error'
                )

            }
          )

        }
      });

  }

  supprimerTache() {
    if (this.membre.id == this.data.ticketTache.membreId)
      Swal.fire({
        title: "vous êtes sûr de supprimer cette tâche : " + this.data.ticketTache.titre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Lancer!',
        cancelButtonText: 'Annuler',
        background: 'rgba(0,0,0,0.9)',
        backdrop: 'rgba(0,0,0,0.4)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusConfirm: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Le code à exécuter si l'utilisateur a cliqué sur "Oui, supprimer!"
          this.ticketTacheService.supprimerTicketTache(this.data.ticketTache.id).subscribe(
            data => {
              Swal.fire(
                'tâche supprimé',
                'Cette tâche a été supprimé.',
                'success'
              )
              const modifData = {
                mode: 'supprimer',
                tt: this.data.ticketTache
              }
              this.dialogRef.close(modifData);
            }
          )

        }
      });

  }

  openFormFunction() {
    this.openForm = !this.openForm
  }
}
