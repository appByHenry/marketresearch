import {Component, OnInit, Output, ViewChild, ViewEncapsulation, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {MatPaginator, MatSort, MatTableDataSource, MatTable} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ThemePalette} from '@angular/material/core';
import {IPlayerskills} from '../../Interface/playerskills';
// import Playersinfo from '../../../mockdata/fifaplayers.json';
import Playersinfo from '../../../mockdata/small_palyers_list.json';
import {DataService} from '../../services/dropdownSelection.service';
import {UniqueRecordService} from '../../services/uniqrecords.service';
import * as _ from 'underscore';


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


  message: any;
  displayedColumns = ['PlayerName', 'nationality', 'league' ,'Rating', 'Position', 'Moves', 'Weak', 'ATK', 'DEF', 'Pace', 'Shoot', 'Pass', 'Defend', 'Dribbling', 'Physical', 'Height'];
  dataSource: MatTableDataSource<IPlayerskills>;
  playertableData: MatTableDataSource<IPlayerskills>;
  // let ids:string = [];
  // expandedElement: MatTableDataSource<IPlayerskills> | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService, private uniquefilterservice: UniqueRecordService) {
    const playersData = Array.from(Playersinfo, (key, val) => formatPlayersData(key));
    // console.log(playersData);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(playersData);
    this.playertableData = new MatTableDataSource(playersData);
    const testFilterObj = uniquefilterservice.setPlayerData(playersData);
    console.log('In constructor', this.dataSource);
    //console.log("Filtered Data: ",testFilterObj);
  }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      this.filterBasedonSelection(message);
      console.log('message', message);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;



    console.log('In ngOninti');
  }
  filterBasedonSelection(selectedVal) {
    if (selectedVal.length > 0) {
      this.playertableData.filteredData = this.dataSource.filteredData;
      const filterdTabledata = _.filter(this.dataSource.filteredData, (val) => {
        return _.some(selectedVal, (val2) => {
          return val2[Object.keys(val2)[0]] === val[Object.keys(val2)[0]];
        });
      });
      this.dataSource.data = filterdTabledata;
      this.dataSource.filteredData = this.playertableData.filteredData;
      console.log('Filterd Data from playertableDataplayertableData ', this.playertableData);
      console.log('Filterd Data from dataSource ', this.dataSource.filteredData);
    }
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
    Height: playerObj.height,
    ps4_last: playerObj.ps4_last,
    ps4_min: playerObj.ps4_min,
    ps4_max: playerObj.ps4_max,
    ps4_prp: playerObj.ps4_prp,
    xbox_last: playerObj.xbox_last,
    xbox_min: playerObj.xbox_min,
    xbox_max: playerObj.xbox_max,
    xbox_prp: playerObj.xbox_prp,
    pc_last: playerObj.pc_last,
    pc_min: playerObj.pc_min,
    pc_max: playerObj.pc_max,
    pc_prp: playerObj.pc_prp,
    player_extended_name: playerObj.player_extended_name,
    quality: playerObj.quality,
    revision: playerObj.revision,
    origin: playerObj.origin,
    club: playerObj.club,
    league: playerObj.league,
    nationality: playerObj.nationality,
    age: playerObj.age,
    date_of_birth: playerObj.date_of_birth,
    intl_rep: playerObj.intl_rep,
    added_date: playerObj.added_date,
    weight: playerObj.weight,
    pace_acceleration: playerObj.pace_acceleration,
    pace_sprint_speed: playerObj.pace_sprint_speed,
    shoot_positioning: playerObj.shoot_positioning,
    shoot_finishing: playerObj.shoot_finishing,
    shoot_shot_power: playerObj.shoot_shot_power,
    shoot_long_shots: playerObj.shoot_long_shots,
    shoot_volleys: playerObj.shoot_volleys,
    shoot_penalties: playerObj.shoot_penalties,
    pass_vision: playerObj.pass_vision,
    pass_crossing: playerObj.pass_crossing,
    pass_free_kick: playerObj.pass_free_kick,
    pass_short: playerObj.pass_short,
    pass_long: playerObj.pass_long,
    pass_curve: playerObj.pass_curve,
    drib_agility: playerObj.drib_agility,
    drib_balance: playerObj.drib_balance,
    drib_reactions: playerObj.drib_reactions,
    drib_ball_control: playerObj.drib_ball_control,
    drib_dribbling: playerObj.drib_dribbling,
    drib_composure: playerObj.drib_composure,
    def_interceptions: playerObj.def_interceptions,
    def_heading: playerObj.def_heading,
    def_marking: playerObj.def_marking,
    def_stand_tackle: playerObj.def_stand_tackle,
    def_slid_tackle: playerObj.def_slid_tackle,
    phys_jumping: playerObj.phys_jumping,
    phys_stamina: playerObj.phys_stamina,
    phys_strength: playerObj.phys_strength,
    phys_aggression: playerObj.phys_aggression
  };
}

