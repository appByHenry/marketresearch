import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/dropdownSelection.service';

@Component({
    selector: 'app-profile-sidebar-component',
    templateUrl: './profilesidebar.component.html',
    styleUrls: ['./profilesidebar.component.scss']
})

export class ProfileSidebarComponent{
    @HostBinding('class.is-open-profile') @Input()
    isOpenProfile = false;
    constructor (private _dataservice: DataService){}
    ngOnInit() {
        this._dataservice.currentToggle.subscribe((toggleValName) => {
            if(toggleValName === 'profile'){
                this.isOpenProfile = true;
            } else{
                this.isOpenProfile = false;
            }
        });
    }
}