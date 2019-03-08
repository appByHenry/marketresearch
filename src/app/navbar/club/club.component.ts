

import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

export interface Club {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-club-navbar',
  templateUrl: './club.component.html',
  styleUrls: ['club.component.scss']
})

export class ClubComponent {
  selected = '';
  clubform = new FormControl();
  clubs: Club[] = [
    { value: 'Milan', viewValue : 'Milan'},
    { value: 'ManU', viewValue : 'ManU'},
    { value: 'Liverpool', viewValue : 'Liverpool'},
    { value: 'Barcelona', viewValue : 'Barcelona'}
  ];
  constructor(private dataservice: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChange(selectedclub): void {
    // const clubFilterObj = {}; 
    // clubFilterObj["club"] = selectedclub;
    // this.dataservice.changeMessage(clubFilterObj, 'wfilter2');
  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('club');
    this.clubs = filterData;
    this.changedropdownservice.filterToUnCheckClub.subscribe((filterValuetoUncheck) => {
        console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.clubform.value && this.clubform.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.clubform.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.clubform.setValue(newDropdownSelection);
          }
        }
    });
    this.clubform.valueChanges.subscribe(value => {
      console.log('my chebox has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    console.log('Position Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedclub) {
    const clubFilterObj = {}; 
    clubFilterObj["club"] = selectedclub;
    this.dataservice.changeMessage(clubFilterObj, 'wfilter2');
  }
}
