import { Component, ViewEncapsulation, OnInit , EventEmitter} from '@angular/core';
import { DataService } from '../../services/dropdownSelection.service';
import * as _ from 'underscore';
import { PlayerDataService } from '../../services/playerscount.service';


@Component({
    selector: 'app-hamburger-component',
    templateUrl: 'hamburger.component.html',
    styleUrls:['hamburger.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class HamburgerComponent implements OnInit{

    numberOfRecords: any = [];
    totalFiltersCount: object;
    constructor(private dataservice: DataService, private playercountservice: PlayerDataService){}
    toggleSideBar(sidebarName: string) {
        this.dataservice.sidebarToggle(sidebarName);
      }

      ngOnInit() {
        console.log('In ngOnInit in hanburger component');
        this.dataservice.currentCount.subscribe(countObj => {
            console.log('In ngOnInit in hanburger component');
            this.formatCountObj(countObj);
          });
        
      }
      formatCountObj = (_countObj) => {
        if (!_.isEmpty(_countObj))
        {
            const filterMatchFound = this.numberOfRecords.find(keyName => keyName.name == _countObj.name);
            console.log("Found the records in existing count:", filterMatchFound);
            this.numberOfRecords.push(_countObj);
            console.log('Non Empty object',this.numberOfRecords);
        }
      }
}
