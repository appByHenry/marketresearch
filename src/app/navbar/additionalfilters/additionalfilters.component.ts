
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdditionalfiltersDialogComponent} from '../filterdialog/filterdialog.component';

export interface Position {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-additionalfilters-navbar',
  templateUrl: './additionalfilters.component.html',
  styleUrls: ['additionalfilters.component.scss']
})

export class AdditionalfiltersComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(AdditionalfiltersDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog REsult: ${result}`);
      });
  }
}

