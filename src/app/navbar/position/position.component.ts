
import {Component, ViewEncapsulation} from '@angular/core';

export interface Position {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-position-navbar',
  templateUrl: './position.component.html',
  styleUrls: ['position.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PositionComponent {
  selected = '';
  positions: Position[] = [
    { value: 'CAM', viewValue : 'CAM'},
    { value: 'CF', viewValue : 'CF'},
    { value: 'GK', viewValue : 'GK'},
    { value: 'MF', viewValue : 'MF'}
  ];
}
