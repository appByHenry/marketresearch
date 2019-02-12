
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-eyefilter-navbar',
  templateUrl: './eyefilter.component.html',
  styleUrls: ['eyefilter.component.scss']
})

export class EyefilterComponent {
  selected = '';
  eyefilters = new FormControl();
  filterList: string[] = ['weight', 'age', 'Show Power' , 'Finishing', 'Agility'];
}
