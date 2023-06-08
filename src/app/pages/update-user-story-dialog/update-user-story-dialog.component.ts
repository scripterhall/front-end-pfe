import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/model/sprint';
import { TicketHistoire } from 'src/app/model/ticket-histoire';
import { HistoireTicketService } from 'src/app/service/histoire-ticket.service';
import { ProductBacklogService } from 'src/app/service/product-backlog.service';
import { SprintService } from 'src/app/service/sprint.service';

@Component({
  selector: 'app-update-user-story-dialog',
  templateUrl: './update-user-story-dialog.component.html',
  styleUrls: ['./update-user-story-dialog.component.scss']
})

export class UpdateUserStoryDialogComponent {
  ticketHistoire: TicketHistoire;
  efforts: number[]=this.histoireTicketService.efforts;
  priorities: string[]=this.histoireTicketService.priorities;
  sprints:Sprint[]=[];

  constructor(
    public dialogRef: MatDialogRef<UpdateUserStoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private histoireTicketService:HistoireTicketService,private sprintService:SprintService,
    private productBacklogService:ProductBacklogService,private toastr: ToastrService
  ) {
    this.histoireTicketService.getUserStoryById(data.id)
      .subscribe(ticketHistoire => this.ticketHistoire = ticketHistoire);

      this.sprintService.getListSprintsByProductBacklog(productBacklogService.getProductBacklogByIdFromLocalStorage()).subscribe(
        data => {
          this.sprints = data ;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUserStory(): void {
    this.histoireTicketService.updateUserStory(this.ticketHistoire.id, this.ticketHistoire)
      .subscribe(updatedTicketHistoire => {
        console.log('Ticket histoire mis à jour: ', updatedTicketHistoire);
        this.dialogRef.close(updatedTicketHistoire);
      });
  }

  assignUserStoryToSprint(histoireTicketId: number, sprintId: number) {
    this.histoireTicketService.assignUserStoryToSprint(histoireTicketId, sprintId)
      .subscribe(
        response => {
          console.log('Histoire ticket affecté au sprint', response);
        },
        error => console.log(error)
      );
  }
}
