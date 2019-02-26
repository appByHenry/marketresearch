
import {Component} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {FormControl} from '@angular/forms';

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
  nation = new FormControl();
  selected = '';
  nationality: Nation[] = [
    { value: 'Brazil', viewValue : 'Brazil'},
    { value: 'Italy', viewValue : 'Italy'},
    { value: 'UK', viewValue : 'UK'},
    { value: 'France', viewValue : 'France'}
  ];

  constructor(private data: DataService) {}
  selectionChange(selectedVal): void {
    const nationData = Array.from(selectedVal, (key, val) => this.constructObj(key));
    this.data.changeMessage(nationData);
  }
  constructObj = (nationName) => {
    return { 'nationality' : nationName};
  }
}
