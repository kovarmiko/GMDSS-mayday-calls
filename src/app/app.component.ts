import { Component } from '@angular/core';
import { Client } from './types/types';
import { BoatNameService } from './core/services/boat-name.service';

export interface Boat {
  boatName: string;
  callSign: string;
}

@Component({
  selector: 'safety-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'safety-system';

  boats: Boat[] = [];

  rescueStationName = {
    deviceName: 'Rescue Station',
    callSign: 'RSCST1'
  }

  constructor(private boatNameService: BoatNameService) {}

  addBoat() {
    this.boats = [
      ...this.boats,
      this.boatNameService.getFirstAvailableBoatName(),
    ];
  }

  releaseBoat(boat: Boat) {
    this.boats = this.boats.filter((item) => item.callSign !== boat.callSign);
    this.boatNameService.releaseBoatName(boat)
  }
}
