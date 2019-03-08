import {Component, OnInit, Output, ViewChild, ViewEncapsulation, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {MatPaginator, MatSort, MatTableDataSource, MatTable} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ThemePalette} from '@angular/material/core';
import {IPlayerskills} from '../../Interface/playerskills';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import { PlayerDataService } from '../../services/playerscount.service';
import * as _ from 'underscore';
import { TableFilterService } from '../../services/tablefilter.service';


@Component({
  selector: 'app-player-overview',
  styleUrls: ['playersdata.component.scss'],
  templateUrl: 'playersdata.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PlayersDataComponent implements OnInit {

  recordCountObj: object = {};
  message: any;
  totalFilterdCounts: number;
  displayedColumns = ['PlayerName', 'nationality', 'league' ,'Rating', 'Position', 'Moves', 'Weak', 'ATK', 'DEF', 'Pace', 'Shoot', 'Pass', 'Defend', 'Dribbling', 'Physical', 'Height', 'star'];
  dataSource: MatTableDataSource<IPlayerskills>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataservice: DataService, private uniquefilterservice: UniqueRecordService,
    private playercountservice: PlayerDataService, private tablefilterservice: TableFilterService) {
    // console.log(playersData);
    // Assign the data to the data source for the table to render
    const tabaleDataFromService = tablefilterservice.getInitialTabledata();
    // console.log(tabaleDataFromService);
    this.dataSource = new MatTableDataSource(tabaleDataFromService);
    // console.log('In constructor in playerdata component', this.dataSource);
  }
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => {
      this.message = message;
      this.filterBasedonSelection(message);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log('In ngOninti in playerdata component');
  }
  filterBasedonSelection(selectedVal) {
    const updatedTableData = this.tablefilterservice.getTableData(selectedVal);
    this.dataSource.data = updatedTableData;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log('In applyfilter');
  }
}



