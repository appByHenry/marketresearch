

import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

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

  nationArry: any = [];

   nationFilterObj = {
    nationality: this.nationArry
  };

  nation = new FormControl();
  selected = '';
  nationality: Nation[] = [
    { value: 'Brazil', viewValue : 'Brazil'},
    { value: 'Italy', viewValue : 'Italy'},
    { value: 'UK', viewValue : 'UK'},
    { value: 'France', viewValue : 'France'}
  ];

  constructor(private dataservice: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChangeNation(selectedNation): void {
    // const nationFilterObj = {}; 
    // nationFilterObj["nationality"] = selectedNation;
    // // const nationData = Array.from(selectedVal, (key, val) => this.constructObj(key));
    // // this.nationFilterObj.nationality = selectedNation;
    // this.dataservice.changeMessage(nationFilterObj, 'wfilter1');

  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('nationality');
    this.nationality = filterData;
    this.changedropdownservice.filterToUnCheckNationality.subscribe((filterValuetoUncheck) => {
        console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.nation.value && this.nation.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.nation.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.nation.setValue(newDropdownSelection);
          }
        }
    });
    this.nation.valueChanges.subscribe(value => {
      console.log('my natioan selection has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    console.log('Nation Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedNationfilter) {
    const nationFilterObj = {}; 
    nationFilterObj["nationality"] = selectedNationfilter;
    // const nationData = Array.from(selectedVal, (key, val) => this.constructObj(key));
    // this.nationFilterObj.nationality = selectedNation;
    this.dataservice.changeMessage(nationFilterObj, 'wfilter1');
  }
}
