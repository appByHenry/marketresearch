import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PlayerDataService } from '../../services/playerscount.service';
import { ChangeDropdownService } from '../../services/changeDropdoenSelection.service';
import { from } from 'rxjs';
import * as _ from 'underscore';




@Component({
    selector: 'app-chips-component',
    templateUrl: 'countchips.component.html',
    styleUrls: ['countchips.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CountChipsComponent implements OnInit {
    constructor(private playercountservice: PlayerDataService, private changedropdownservice: ChangeDropdownService){};
    visible = true;
    selectable = true;
    removable = true;

    isFilterEnable1 = false;
    isFilterEnable2 = false;
    isFilterEnable3 = false;

    // chipsFilters: object = {};
    chipsFilters1: object = {};
    chipsFilters2: object = {};
    chipsFilters3: object = {};
    ngOnInit(){
        this.playercountservice.overallPlayerCount.subscribe(filterObj => {
            console.log('In ngOnInit in countchips component');
            console.log('Total players count from count chips: ', filterObj['countDisplayObj']);
            if (!_.isEmpty(filterObj)) {
                this.assignCountToChips(filterObj['countDisplayObj'], filterObj['countDisplayFilter']);
            } else {
                this.chipsFilters1 = {};
                this.chipsFilters2 = {};
                this.chipsFilters3 = {};
            }
          });
    }
    assignCountToChips(objWithCount, displayFilter){
        let chipsFilterObj = this.playercountservice.adjustCountForChips(objWithCount);
        console.log(chipsFilterObj);
        this.chipsFilters1 = {};
        this.chipsFilters2 = {};
        this.chipsFilters3 = {};

        this.isFilterEnable1 = false;
        this.isFilterEnable2 = false;
        this.isFilterEnable3 = false;
        if (!_.isEmpty(chipsFilterObj['wfilter1'])) {
            this.chipsFilters1 = chipsFilterObj['wfilter1'];
            this.isFilterEnable1 = true;
        }
        if (!_.isEmpty(chipsFilterObj['wfilter2'])) {
            this.chipsFilters2 = chipsFilterObj['wfilter2'];
            this.isFilterEnable2 = true;
        }
        if (!_.isEmpty(chipsFilterObj['wfilter3'])) {
            this.chipsFilters3 = chipsFilterObj['wfilter3'];
            this.isFilterEnable3 = true;
        }
    }
    removeFilter(chipsToRemove, filtertypeDropdown): any {
        console.log("Removed filter:", filtertypeDropdown.textContent);
        this.changedropdownservice.removeFilter(chipsToRemove, filtertypeDropdown.textContent);
      }
}