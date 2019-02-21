
import {Component, ViewEncapsulation, Output, Input, EventEmitter, ViewChild, OnChanges, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';

import {DataService} from '../../services/dropdownSelection.service';
import {PlayersDataComponent} from '../../playertable/playersdata/playersdata.component';


@Component({
  selector: 'app-eyefilter-navbar',
  templateUrl: './eyefilter.component.html',
  styleUrls: ['eyefilter.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class EyefilterComponent {

  @Output() dropdownvalue: EventEmitter<any> = new EventEmitter();

  message: string;
  eyefilters = new FormControl();
  filterList: string[] = ['Height', 'age', 'Show Power' , 'Finishing', 'Agility'];

  constructor(private data: DataService) {}
  selectionChange(selectedVal): void {
    this.dropdownvalue.emit(selectedVal[0]);
    this.data.changeMessage(selectedVal[0]);
  }
}
