import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import * as _ from 'underscore';
// import Playersinfo from '../../mockdata/compact-players.json';
import Playersinfo from '../../mockdata/medium-fifa-players.json';
import { IPlayerskills } from '../Interface/playerskills';
import { UniqueRecordService } from './uniqrecords.service';

@Injectable()
export class TableFilterService{
    filterOfRecords: object = {};
    totalFilterdCounts: number;
    filterwithCounts: object = {};
    playersData = Array.from(Playersinfo, (key, val) => this.formatPlayersData(key));
    constructor(private uniquefilterservice: UniqueRecordService){
    }

    getInitialTabledata() {
        this.uniquefilterservice.setPlayerData(this.playersData);
        const initialTableData = this.getOnly100Records(this.playersData);
        return initialTableData;
    }
    getTableData(dropDownSelection){
      const tableData = this.filterBasedonSelection(dropDownSelection);
      if (tableData["tableRows"]) {
        return tableData["tableRows"];
      }
    }
    getSum(total, num) {
      return total + num;
    }
    getCountObj(_dropdownSelection){
      const countObj = this.filterBasedonSelection(_dropdownSelection);
      const countFilterObj = {};
      if (countObj["filtersCount"]) {
        const filtersKeys = _.allKeys(countObj["filtersCount"]);
          _.each(filtersKeys, (eachFilter) => {
              countFilterObj[eachFilter] = {};
              countFilterObj[eachFilter]["filters"] = countObj["filtersCount"][eachFilter];
              const calculateCount = _.values(countObj["filtersCount"][eachFilter]);
              countFilterObj[eachFilter]["count"] = calculateCount.reduce(this.getSum);
              // console.log(filtersKeys);
          });
        // console.log(countFilterObj);
        return countFilterObj;
      }
    }
    adjustSelectionFilterObj(selectedVal){
      if (!_.isEmpty(this.filterOfRecords)) {
        if (!_.isEmpty(selectedVal) && selectedVal[Object.keys(selectedVal)[0]].length) {
          this.filterOfRecords[Object.keys(selectedVal)[0]] = selectedVal[Object.keys(selectedVal)[0]];
        } else {
          delete this.filterOfRecords[Object.keys(selectedVal)[0]];
        }
      } else {
          this.filterOfRecords = selectedVal;
      }
    }
    filterBasedonSelection(selectedVal) {
        const returnObj = {};
        this.adjustSelectionFilterObj(selectedVal);
        let filterdTableData: any = " ";
        let tableRcords = this.playersData;
        this.filterwithCounts = {};
        for (const key of Object.keys(this.filterOfRecords)) {
          // console.log(key, this.filterOfRecords[key]);
          filterdTableData = this.filterTable(key, this.filterOfRecords[key], tableRcords);
          tableRcords = filterdTableData["tableData"][0];
          // console.log(filterdTableData["tableData"]);
          // console.log(filterdTableData["countData"]);
          returnObj["filtersCount"] = filterdTableData["countData"];
        }
        this.totalFilterdCounts = tableRcords.length;
        const limitedRecords = this.getOnly100Records(tableRcords);
        // console.log(this.totalFilterdCounts);
        returnObj["tableRows"] = limitedRecords;
        // console.log(returnObj);
        return returnObj;
      }
      filterTable(filterName: string, filterRecords: any, records: any){
        let filteredData;
        let filterDataArray = [];
        const filterCountArray = {};
        const eachFilterCount = {};
        filterRecords.forEach((element, key) => {
          filteredData = _.filter(records, (val) => {
              return element === val[filterName];
          });
          const tempArray = [];
          eachFilterCount[element] = filteredData.length;
          tempArray.push(filteredData);
          if (filterDataArray.length) {
            const concatinaedArray = tempArray[0].concat(filterDataArray[0]);
            // console.log(concatinaedArray);
            filterDataArray = [];
            filterDataArray.push(concatinaedArray);
            // console.log(filterDataArray);
          } else {
              filterDataArray.push(tempArray[0]);
            }
        });
        this.filterwithCounts[filterName] = eachFilterCount;
        filterCountArray['tableData'] = filterDataArray;
        filterCountArray['countData'] = this.filterwithCounts;
        return filterCountArray;
      }
      getOnly100Records(arryaToFotler: any){
        return arryaToFotler.filter((arrVal, arrIndex) => {
          return arrIndex < 101;
        });
      }
      formatPlayersData(playerObj: any): any {
        // console.log('In formatPlayersData function');
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
}