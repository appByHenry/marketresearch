
import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';

import {FormControl} from '@angular/forms';

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
  postions = new FormControl();
  selected = '';
  positions: Position[] = [
    { value: 'CAM', viewValue : 'CAM'},
    { value: 'CF', viewValue : 'CF'},
    { value: 'GK', viewValue : 'GK'},
    { value: 'MF', viewValue : 'MF'}
  ];
  
  constructor(private data: DataService, private filterservice: UniqueRecordService) {}
  selectionChange(selectedVal): void {
    const positionData = Array.from(selectedVal, (key, val) => this.constructObj(key));
    this.data.changeMessage(positionData);
  }

  constructObj = (positionName) => {
    return { 'Position' : positionName};
  }
  ngOnInit(){
    const filterData = this.filterservice.filterDistincitRecords('Position');
    console.log("Position Filter Data: ", filterData);
  }
}
