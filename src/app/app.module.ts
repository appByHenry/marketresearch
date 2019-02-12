import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PositionComponent} from './navbar/position/position.component';
import { NationComponent } from './navbar/nation/nation.component';
import { LeagueComponent} from './navbar/league/league.component';
import { ClubComponent} from './navbar/club/club.component';
import { TnsComponent } from './navbar/tns/tns.component';
import { EyefilterComponent} from './navbar/eyefilter/eyefilter.component';
import { AdditionalfiltersComponent} from './navbar/additionalfilters/additionalfilters.component';
import { AdditionalfiltersDialogComponent} from './navbar/filterdialog/filterdialog.component';
import { PaceComponent} from './navbar/pace/pace.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PositionComponent,
    NationComponent,
    LeagueComponent,
    ClubComponent,
    TnsComponent,
    EyefilterComponent,
    AdditionalfiltersDialogComponent,
    AdditionalfiltersComponent,
    PaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule
  ],
  entryComponents: [AdditionalfiltersComponent, AdditionalfiltersDialogComponent],
  providers: [],
  bootstrap: [AppComponent, EyefilterComponent]
})
export class AppModule { }
