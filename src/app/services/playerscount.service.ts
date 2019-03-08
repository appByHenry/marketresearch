import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/index';
import { BehaviorSubject, Subject} from 'rxjs/index';
import * as _ from 'underscore';

@Injectable()
export class PlayerDataService {
  private playerCount = new BehaviorSubject({});
  overallPlayerCount = this.playerCount.asObservable();

  wfilter1: object;
  wfilter2: object;
  wfilter3: object;
  private totalRecordCount: number;

  onPlayercountChange(filterObj: any, filterType: string) {
    const countDisplayObj = {};
    countDisplayObj["countDisplayObj"] = filterObj;
    countDisplayObj["countDisplayFilter"] = filterType;
    console.log('In onPlayercountChange in playercount service');
    this.playerCount.next(countDisplayObj);
  }

  adjustCountForChips(filterCountObj: any) {
    const returnFilterCountObj = {};
    returnFilterCountObj['wfilter1'] = _.pick(filterCountObj, 'Position', 'nationality');
    returnFilterCountObj['wfilter2'] = _.pick(filterCountObj, 'club', 'league');
    returnFilterCountObj['wfilter3'] = _.pick(filterCountObj, 'origin', 'quality');

    return returnFilterCountObj;
  }
}

