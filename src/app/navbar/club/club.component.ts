
import {Component} from '@angular/core';

export interface Club {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-club-navbar',
  templateUrl: './club.component.html',
  styleUrls: ['club.component.scss']
})

export class ClubComponent {
  selected = '';
  clubs: Club[] = [
    { value: 'Milan', viewValue : 'Milan'},
    { value: 'ManU', viewValue : 'ManU'},
    { value: 'Liverpool', viewValue : 'Liverpool'},
    { value: 'Barcelona', viewValue : 'Barcelona'}
  ];
}
