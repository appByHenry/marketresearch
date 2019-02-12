
import {Component} from '@angular/core';

export interface Nation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nation-navbar',
  templateUrl: './nation.component.html',
  styleUrls: ['nation.component.scss']
})

export class NationComponent {
  selected = '';
  nationality: Nation[] = [
    { value: 'Brazil', viewValue : 'Brazil'},
    { value: 'Italy', viewValue : 'Italy'},
    { value: 'UK', viewValue : 'UK'},
    { value: 'France', viewValue : 'France'}
  ];
}
