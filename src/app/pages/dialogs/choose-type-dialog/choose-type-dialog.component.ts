import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-type-dialog',
  templateUrl: './choose-type-dialog.component.html',
  styleUrls: ['./choose-type-dialog.component.scss']
})
export class ChooseTypeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChooseTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectType(type: string) {
    this.dialogRef.close(type);
  }
}
