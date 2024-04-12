import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadioComponent } from './radio/radio.component';
import { RadarComponent } from './radar/radar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoatComponent } from './boat/boat.component';
import { RescueStationComponent } from './rescue-station/rescue-station.component';

@NgModule({
  declarations: [
    AppComponent,
    RadioComponent,
    RadarComponent,
    DashboardComponent,
    BoatComponent,
    RescueStationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    // MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
