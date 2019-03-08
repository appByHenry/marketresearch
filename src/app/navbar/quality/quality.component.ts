
import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

export interface Quality {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quality-navbar',
  templateUrl: './quality.component.html',
  styleUrls: ['quality.component.scss']
})
export class QualityComponent {
  selected = '';
  qualityform = new FormControl();
  qualities: Quality[] = [
    { value: 'Gold - Rare', viewValue : 'Gold - Rare'}
  ];
  constructor(private dataservice: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChange(selectedquality): void {
    // const qualityFilterObj = {}; 
    // qualityFilterObj["quality"] = selectedquality;
    // this.dataservice.changeMessage(qualityFilterObj, 'wfilter3');
  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('quality');
    this.qualities = filterData;
    this.changedropdownservice.filterToUnCheckQuality.subscribe((filterValuetoUncheck) => {
        console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.qualityform.value && this.qualityform.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.qualityform.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.qualityform.setValue(newDropdownSelection);
          }
        }
    });
    this.qualityform.valueChanges.subscribe(value => {
      console.log('my natioan selection has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    console.log('qualityform Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedfilter) {
    const qualityFilterObj = {}; 
    qualityFilterObj["quality"] = selectedfilter;
    this.dataservice.changeMessage(qualityFilterObj, 'wfilter3');
  }
}
