

import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

export interface Origin {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-origin-navbar',
  templateUrl: './origin.component.html',
  styleUrls: ['origin.component.scss']
})
export class OriginComponent {
  selected = '';
  originform = new FormControl();
  originlist: Origin[] = [
    { value: 'Prime', viewValue : 'Prime'},
    { value: 'Base', viewValue : 'Base'}
  ];
  constructor(private dataservice: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChange(selectedorigin): void {
    // const originFilterObj = {}; 
    // originFilterObj["origin"] = selectedorigin;
    // this.dataservice.changeMessage(originFilterObj, 'wfilter3');
  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('origin');
    this.originlist = filterData;
    this.changedropdownservice.filterToUnCheckOrigin.subscribe((filterValuetoUncheck) => {
        console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.originform.value && this.originform.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.originform.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.originform.setValue(newDropdownSelection);
          }
        }
    });
    this.originform.valueChanges.subscribe(value => {
      console.log('my chebox has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    console.log('Position Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedorigin) {
    const originFilterObj = {}; 
    originFilterObj["origin"] = selectedorigin;
    this.dataservice.changeMessage(originFilterObj, 'wfilter3');
  }
}
