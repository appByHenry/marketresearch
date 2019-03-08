
import {Component, ViewEncapsulation , Output, Input, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';

export interface League {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-league-navbar',
  templateUrl: './league.component.html',
  styleUrls: ['league.component.scss']
})

export class LeagueComponent {
  leagueform = new FormControl();
  selected = '';
  leagues: League[] = [
    { value: 'AC', viewValue : 'AC'},
    { value: 'DK', viewValue : 'DK'},
    { value: 'LP', viewValue : 'LP'},
    { value: 'QZ', viewValue : 'QZ'}
  ];
  constructor(private dataservice: DataService, private filterservice: UniqueRecordService,
              private changedropdownservice: ChangeDropdownService) {}
  selectionChange(selectedLeague): void {
    // const leagueFilterObj = {}; 
    // leagueFilterObj["league"] = selectedLeague;
    // this.dataservice.changeMessage(leagueFilterObj, 'wfilter2');
  }
  ngOnInit() {
    const filterData = this.filterservice.filterDistincitRecords('league');
    this.leagues = filterData;
    this.changedropdownservice.filterToUnCheckleague.subscribe((filterValuetoUncheck) => {
        console.log("Filter Value to uncheck: ", filterValuetoUncheck);
        if (!_.isEmpty(filterValuetoUncheck)){
          const selectedIndex = this.leagueform.value && this.leagueform.value.indexOf(filterValuetoUncheck)
          if (selectedIndex > -1){
            const newDropdownSelection = this.leagueform.value.slice();
            newDropdownSelection.splice(selectedIndex, 1);
            this.leagueform.setValue(newDropdownSelection);
          }
        }
    });
    this.leagueform.valueChanges.subscribe(value => {
      console.log('my chebox has changed', value);
      this.triggerSelectionChange(value);
      // this.selectionChange(value);
    });
    console.log('Position Filter Data: ', filterData);
  }
  triggerSelectionChange(selectedLeague) {
    const leagueFilterObj = {}; 
    leagueFilterObj["league"] = selectedLeague;
    this.dataservice.changeMessage(leagueFilterObj, 'wfilter2');
  }
}
