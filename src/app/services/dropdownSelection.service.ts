import { BehaviorSubject, Subject, Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  
  private messageSource = new BehaviorSubject({});
  private recordCount = new BehaviorSubject({});
  private toggleView = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();
  currentCount = this.recordCount.asObservable();

  currentToggle = this.toggleView.asObservable();

  constructor() { 
    // console.log('In constructor in dropdownselection service ');
  }

  changeMessage(selection: any, filterType: any) {
    const formatFilterNSelection = {};
    formatFilterNSelection['selection'] = selection;
    formatFilterNSelection['filterstyle'] = filterType;
    // console.log('In changeMessage in dropdownselection service', filterType);
    this.messageSource.next(formatFilterNSelection);
  }

  changeCount(count:object){
    // console.log('In changeCount in dropdownselection service');
    this.recordCount.next(count);
  }

  sidebarToggle(toggleComponentName: string){
    // console.log('In sidebarToggle in dropdownselection service');
    this.toggleView.next(toggleComponentName);
  }


}
