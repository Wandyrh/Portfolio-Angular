import { Component, Inject } from '@angular/core';
import { QuestionDialogData } from '../../models/question-dialog-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  imports: [],
  templateUrl: './question-dialog.html',
  styleUrl: './question-dialog.scss'
})
export class QuestionDialog {
  questionData : QuestionDialogData;

  constructor(
      public dialogRef: MatDialogRef<QuestionDialog>,      
      @Inject(MAT_DIALOG_DATA) public data: QuestionDialogData
    ) { 
      this.questionData = data;
    } 

    closeDialog(result: boolean) : void {
      this.dialogRef.close(result);
    }

}
