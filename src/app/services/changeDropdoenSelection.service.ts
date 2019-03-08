import { BehaviorSubject } from 'rxjs/index';
import { Injectable } from '@angular/core';

@Injectable()
export class ChangeDropdownService{
    private positionFilter = new BehaviorSubject({});
    filterToUnCheck = this.positionFilter.asObservable();

    private nationalityFilter = new BehaviorSubject({});
    filterToUnCheckNationality = this.nationalityFilter.asObservable();

    private leagueFilter = new BehaviorSubject({});
    filterToUnCheckleague = this.leagueFilter.asObservable();

    private clubFilter = new BehaviorSubject({});
    filterToUnCheckClub = this.clubFilter.asObservable();

    private originFilter = new BehaviorSubject({});
    filterToUnCheckOrigin = this.originFilter.asObservable();

    private qualityFilter = new BehaviorSubject({});
    filterToUnCheckQuality = this.qualityFilter.asObservable();

    constructor() {}
    removeFilterFromPosition(filterToRemove){
        this.positionFilter.next(filterToRemove);
    }
    removeFilterFromNationality(filterToRemove){
        this.nationalityFilter.next(filterToRemove);
    }
    removeFilterFromLeague(filterToRemove){
        this.leagueFilter.next(filterToRemove);
    }
    removeFilterFromClub(filterToRemove){
        this.clubFilter.next(filterToRemove);
    }
    removeFilterFromOrigin(filterToRemove){
        this.originFilter.next(filterToRemove);
    }
    removeFilterFromQuality(filterToRemove){
        this.qualityFilter.next(filterToRemove);
    }
    
    removeFilter(chipsToRemove, filterName){
        if (filterName == "Position") {
            this.removeFilterFromPosition(chipsToRemove);
        } else if (filterName == "nationality") {
            this.removeFilterFromNationality(chipsToRemove);
        } else if (filterName == "league") {
            this.removeFilterFromLeague(chipsToRemove);
        } else if (filterName == "club") {
            this.removeFilterFromClub(chipsToRemove);
        } else if (filterName == "quality") {
            this.removeFilterFromQuality(chipsToRemove);
        } else if (filterName == "origin") {
            this.removeFilterFromOrigin(chipsToRemove);
        }
    }
}