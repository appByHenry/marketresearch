import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/index';

@Injectable()
export class PlayerSkillsService {
  constructor(private httpClient: HttpClient) {
    this.getPlayerSkills().subscribe(data => {
      console.log(data);
      });
  }
  getPlayerSkills(): Observable<any> {
    return this.httpClient.get('playersdata.json');
  }
}

