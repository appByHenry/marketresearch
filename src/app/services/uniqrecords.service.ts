import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/index';
import { BehaviorSubject, Subject} from 'rxjs/index';
import * as _ from 'underscore';

@Injectable()
export class UniqueRecordService{
    private playerData;
    setPlayerData(playerary: Array<object>):any{
        this.playerData = playerary;
    }
    filterDistincitRecords(filterbyval):any {
        var arr = _.chain(this.playerData).map(function(item) { return item[filterbyval] }).uniq().value();
//      console.log(reducedArray.join(","));
        console.log("filtered Array: ",arr);
        return arr;
    }
    getPlayerData(): any{
        return this.playerData;
    }


}