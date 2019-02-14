import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ThemePalette} from '@angular/material/core';
import {IPlayerskills} from '../../Interface/playerskills';
import Playersinfo from '../../../mockdata/fifaplayers.json';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

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
  centered = true;
  disabled = false;
  unbounded = true;
  radius: 10;

  displayedColumns = ['PlayerName', 'Rating', 'Position', 'Moves', 'Weak', 'ATK', 'DEF', 'Pace', 'Shoot', 'Pass', 'Defend', 'Dribbling', 'Physical', 'Height'];
  dataSource: MatTableDataSource<IPlayerskills>;
  // expandedElement: MatTableDataSource<IPlayerskills> | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  availableColors: ChipColor[] = [
    {name: 'Primary', color: 'primary'}
  ];

  constructor() {
    const playersData = Array.from(Playersinfo, (key, val) => formatPlayersData(key));
    // console.log(playersData);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(playersData);
    // this.expandedElement = new MatTableDataSource(playersData);
    console.log('In constructor', this.dataSource);
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('In ngOninti');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log('In applyfilter');
  }
}

function formatPlayersData(playerObj: any): any {
  console.log('In formatPlayersData function');
  return{
    Id: playerObj.resource_id,
    PlayerName: playerObj.player_name,
    Rating: playerObj.overall,
    Position: playerObj.position,
    Moves: playerObj.skill_moves,
    Weak: playerObj.weak_foot,
    ATK: playerObj.att_workrate,
    DEF: playerObj.def_workrate,
    Pace: playerObj.pace,
    Shoot: playerObj.shooting,
    Pass: playerObj.passing,
    Defend: playerObj.defending,
    Dribbling: playerObj.dribbling,
    Physical: playerObj.physicality,
    Height: playerObj.height
  };
}

