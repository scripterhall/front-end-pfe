import { HttpClient } from '@angular/common/http';
import { Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistoireTicketService } from 'src/app/service/histoire-ticket.service';
import { ProductBacklogService } from 'src/app/service/product-backlog.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-confirm-add-user-story-dialogue',
  templateUrl: './confirm-add-user-story-dialogue.component.html',
  styleUrls: ['./confirm-add-user-story-dialogue.component.scss']
})
export class ConfirmAddUserStoryDialogueComponent {

  isFormDisabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ConfirmAddUserStoryDialogueComponent>,
  private http: HttpClient, private productBacklogService:ProductBacklogService,
  private histoireTicketService:HistoireTicketService) { }

  toggleForm() {
    this.isFormDisabled = !this.isFormDisabled;
    if (!this.isFormDisabled) {
      this.data.item.productBacklogId = this.productBacklogService.getProductBacklogByIdFromLocalStorage();
      this.data.item = {...this.data.item};
    }
  }

  addNewUserStory() {
    const newItem = {...this.data.item};
    newItem.id = null;
    newItem.productBacklogId=this.productBacklogService.getProductBacklogByIdFromLocalStorage();
    this.histoireTicketService.addNewUserStory(newItem).subscribe(
      response => {
        this.elevateProductBacklogVelocity(this.productBacklogService.getProductBacklogByIdFromLocalStorage(),newItem.effort);
        console.log('élément ajouté avec succès');
        console.log(newItem);
        this.dialogRef.close(response);
        
      },
      error => {
        console.error('erreur lors de l\'ajout de l\'élément : ', error);
      }
    );
  }

  elevateProductBacklogVelocity(productBacklogId: number, effort: number) {
    this.productBacklogService.elevateProductBacklogVelocity(productBacklogId, effort)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
}

