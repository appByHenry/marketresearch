import { BehaviorSubject, Subject} from 'rxjs/index';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Array<object>) {
    this.messageSource.next(message);
  }

}
