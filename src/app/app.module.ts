import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app.matmodule';
import {PlayerDataService} from './services/playerscount.service';
import {DataService} from './services/dropdownSelection.service';
import {TableFilterService} from './services/tablefilter.service';
import {UniqueRecordService} from './services/uniqrecords.service';
import { ChangeDropdownService } from './services/changeDropdoenSelection.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconRegistry} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PositionComponent} from './navbar/position/position.component';
import { NationComponent } from './navbar/nation/nation.component';
import { LeagueComponent} from './navbar/league/league.component';
import { ClubComponent} from './navbar/club/club.component';
import {PlayersDataComponent} from './playertable/playersdata/playersdata.component';
import {AddcolumnDirective} from './directive/addingcolumn/addcolumn.directive';
import { HamburgerComponent } from './basecomponent/hamburger/hamburger.component';
import { from } from 'rxjs';
import { ProfileComponent } from './basecomponent/togglebuttonscomponent/profilecomponent/profile.component';
import { ProfileSidebarComponent } from './basecomponent/togglesidebarcomponent/profilesidebarcomponent/profilesidebar.component';
import { WorkflowComponent } from './basecomponent/togglebuttonscomponent/workflowcomponent/workflow.component';
import { WorkflowSidebarComponent } from './basecomponent/togglesidebarcomponent/workflowsidebarcomponent/workflowsidebar.component';
import { CountChipsComponent } from './basecomponent/countshipscomponent/countchips.component';
import { WorkflowFilter1Component } from './navbar/wfilter1/wfilter1.component';
import { WorkflowFilter2Component } from './navbar/wfilter2/wfilter2.component';
import { WorkflowFilter3Component } from './navbar/wfilter3/wfilter3.component';
import { OriginComponent } from './navbar/origin/origin.component';
import { QualityComponent } from './navbar/quality/quality.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PositionComponent,
    NationComponent,
    LeagueComponent,
    ClubComponent,
    PlayersDataComponent,
    AddcolumnDirective,
    HamburgerComponent,
    ProfileComponent,
    ProfileSidebarComponent,
    WorkflowComponent,
    WorkflowSidebarComponent,
    CountChipsComponent,
    WorkflowFilter1Component,
    WorkflowFilter2Component,
    WorkflowFilter3Component,
    OriginComponent,
    QualityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  entryComponents: [],
  providers: [PlayerDataService, DataService, UniqueRecordService, TableFilterService, ChangeDropdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
