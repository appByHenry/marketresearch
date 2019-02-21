import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/index';
import { BehaviorSubject, Subject} from 'rxjs/index';


@Injectable()
export class PlayerSkillsService {
  private subject = new Subject<any>();
  onChangeSelect(val: string) {
    this.subject.next(val);
  }

  getSelectedDropdown(): Observable<any> {
    return this.subject.asObservable();
  }
  // private defaultSelection = new BehaviorSubject('');
  // currentDropdownSelection = this.defaultSelection.asObservable();

  constructor(private httpClient: HttpClient) {
    // this.getPlayerSkills().subscribe(data => {
    //   console.log(data);
    //   });
  }
  // getPlayerSkills(): Observable<any> {
  //   return this.httpClient.get('playersdata.json');
  // }


  // changeDropdownValue(value: string) {
  //   this.defaultSelection.next(value);
  // }

  // updateDropdownSelection() {
  //   // return this.selectedVal;
  //
  // }
}

