import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/index';
import { BehaviorSubject, Subject} from 'rxjs/index';
import * as _ from 'underscore';

@Injectable()
export class UniqueRecordService{
    private playerData;
    setPlayerData(playerary: Array<object>):any{
        console.log('In setPlayerData in unique record service');
        this.playerData = playerary;
    }
    filterDistincitRecords(filterbyval):any {
        let arr = _.chain(this.playerData).map((item) => { 
            return item[filterbyval] }).uniq().value();
        let dropDownArray = [];
        _.map(arr, (eachVal) => {
                let buildSelectionObj = {};
                buildSelectionObj['value'] = eachVal;
                buildSelectionObj['viewValue'] = eachVal;
                dropDownArray.push(buildSelectionObj)
                return dropDownArray;
        });

        return dropDownArray;
    }
    getPlayerData(): any{
        // console.log('In getPlayerData in unique record service');
        return this.playerData;
    }
}