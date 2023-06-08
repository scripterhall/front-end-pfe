import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-delete-user-story',
  templateUrl: './confirm-dialog-delete-user-story.component.html',
  styleUrls: ['./confirm-dialog-delete-user-story.component.scss']
})
export class ConfirmDialogDeleteUserStoryComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
