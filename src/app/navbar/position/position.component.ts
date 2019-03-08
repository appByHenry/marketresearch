
import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

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
/**
 * 
 *{position : ['cam', 'Cf']} 
 */
export class PositionComponent {

  postions = new FormControl();
  selected = '';
  positions: Position[] = [
    { value: 'CAM', viewValue : 'CAM'},
    { value: 'CF', viewValue : 'CF'},
    { value: 'GK', viewValue : 'GK'},
    { value: 'MF', viewValue : 'MF'}
  ];
  constructor(private data: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChange(selectedPosition): void {
    // this.triggerSelectionChange(selectedPosition);
  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('Position');
    this.positions = filterData;
    this.changedropdownservice.filterToUnCheck.subscribe((filterValuetoUncheck) => {
        // console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.postions.value && this.postions.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.postions.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.postions.setValue(newDropdownSelection);
          }
        }
    });
    this.postions.valueChanges.subscribe(value => {
      // console.log('my chebox has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    // console.log('Position Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedPositionfilter) {
    const positionFilterObj = {};
    positionFilterObj["Position"] = selectedPositionfilter;
    this.data.changeMessage(positionFilterObj, 'wfilter1');
  }
}
