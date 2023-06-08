import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HistoireTicketService } from 'src/app/service/histoire-ticket.service';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MembreService } from 'src/app/service/membre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-ticket-histoire-form',
  templateUrl: './ajouter-ticket-histoire-form.component.html',
  styleUrls: ['./ajouter-ticket-histoire-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class AjouterTicketHistoireFormComponent {

  efforts: number[]=this.histoireTicketService.efforts;
  priorities: string[]=this.histoireTicketService.priorities;

  constructor(private fb: FormBuilder, private histoireTicketService:HistoireTicketService,
    public dialogRef: MatDialogRef<AjouterTicketHistoireFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membreService:MembreService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    const formData = this.form.value;
    formData.membreId=this.membreService.getMembreFromToken().id;
    this.histoireTicketService.addTicket(formData).subscribe(
      response => {
        console.log('Ticket histoire ajouté avec succès.');
        console.log(formData);
console.log('id histoire ticket = '+formData.id)
        this.dialogRef.close(response);
      },
      error => {
        console.error("Erreur d'enregistrement du ticket histoire ! : ", error);
          if (error.status == 401)
            Swal.fire(
              'Attention',
              'Vous n\'avez pas une autorisation',
              'error'
            )
      }
        
    );
  }

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      effort: ['', Validators.required],
      priorite: ['', Validators.required],
      membreId:1
    });
  }


}

