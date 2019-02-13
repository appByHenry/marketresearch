import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {IPlayerskills} from '../../Interface/playerskills';
import Playersinfo from '../../../mockdata/fifaplayers.json';

@Component({
  selector: 'app-player-overview',
  styleUrls: ['playersdata.component.scss'],
  templateUrl: 'playersdata.component.html',
})

export class PlayersDataComponent implements OnInit {

  displayedColumns: string[] = ['PlayerName', 'Rating', 'Position', 'Moves', 'Weak', 'ATK', 'DEF', 'Pace', 'Shoot', 'Pass', 'Defend', 'Dribbling', 'Physical', 'Height'];
  dataSource: MatTableDataSource<IPlayerskills>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const playersData = Array.from(Playersinfo, (key, val) => formatPlayersData(key));
    console.log(playersData);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(playersData);
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function formatPlayersData(playerObj: any): any {
  return{
    id: playerObj.resource_id,
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

