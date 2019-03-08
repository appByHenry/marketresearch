import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../services/dropdownSelection.service';
import { TableFilterService } from '../../../services/tablefilter.service';
import { PlayerDataService } from '../../../services/playerscount.service';
import {TooltipPosition} from '@angular/material';
import * as _ from 'underscore';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-workflow-sidebar-component',
    templateUrl: './workflowsidebar.component.html',
    styleUrls: ['./workflowsidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})  

export class WorkflowSidebarComponent{
    filterSelection: any;
    overallCount: number = 0;
    sidebarheading: string = "Workflow filters and count.";

    tooltipposition: any = 'above';
    /**
     * The follwoing portion is not in use currently.
     */
    tooltipPositionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    workflowSideBarForm = new FormControl();

    constructor(private dataservice: DataService, private tablefilterservice: TableFilterService,
                private playercountservice: PlayerDataService){ }
    @HostBinding('class.is-open-workflow') @Input()
    isOpenWorkflow = false;

    panelOpenState = true;
    step;
    setStep(index: number) {
        this.step = index;
      }
      nextStep() {
        this.step++;
      }
      prevStep() {
        this.step--;
      }
      ngOnInit() {
        this.tablefilterservice.getInitialTabledata();
        this.dataservice.currentToggle.subscribe((toggleValName) => {
            if(toggleValName === 'workflow'){
                this.isOpenWorkflow = true;
            } else{
                this.isOpenWorkflow = false;
            }
        });

        this.dataservice.currentMessage.subscribe(selectedFilter => {
          if (!_.isEmpty(selectedFilter)) {
            this.filterSelection = {};
            this.filterSelection = selectedFilter;
            /**
             * Send the dropdown selection and get the count of all filters.
             */
            const filtersCount = this.tablefilterservice.getCountObj(this.filterSelection.selection);
            /**
             * Send the filter count object so chips component can set the chips.
             */
            this.playercountservice.onPlayercountChange(filtersCount, this.filterSelection.filterstyle);
            let overallCount = 0;
            try{
              this.overallCount = filtersCount[Object.keys(selectedFilter["selection"])[0]]["count"];
            }
            catch(e) {
              this.overallCount = 0;
               
              if (filtersCount) {
                const lastSelection = filtersCount[Object.keys(filtersCount)[Object.keys(filtersCount).length - 1]];
                this.overallCount = lastSelection["count"];
              }
            }
            
            // const unionObject = _.values(filtersCount);
            // // const unionObject = _.values(selectedFilter["selection"]);
            // const totalCount = _.pluck(unionObject, 'count');
            // if (totalCount.length > 0) {
            //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
            //   overallCount = totalCount.reduce(reducer);
            //   this.overallCount = overallCount;
            // } else {
            //   this.overallCount = overallCount;
            // }
            console.log("Count from the sidebar component: ", filtersCount);
          }
        });
      
      }


}