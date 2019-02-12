
import {Component} from '@angular/core';

export interface League {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-league-navbar',
  templateUrl: './league.component.html',
  styleUrls: ['league.component.scss']
})

export class LeagueComponent {
  selected = '';
  leagues: League[] = [
    { value: 'AC', viewValue : 'AC'},
    { value: 'DK', viewValue : 'DK'},
    { value: 'LP', viewValue : 'LP'},
    { value: 'QZ', viewValue : 'QZ'}
  ];
}
