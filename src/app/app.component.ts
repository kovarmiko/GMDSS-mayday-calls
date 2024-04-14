import { Component } from '@angular/core';
import { BoatNameService } from './core/services/boat-name.service';
import { MessageService } from './core/services/message.service';

export interface Boat {
  deviceName: string;
  callSign: string;
}
export interface DeviceName {
  deviceName: string;
  callSign: string;
}

@Component({
  selector: 'safety-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'safety-system';

  boats: Boat[] = [
    this.boatNameService.getFirstAvailableBoatName(),
    this.boatNameService.getFirstAvailableBoatName(),
    this.boatNameService.getFirstAvailableBoatName(),
  ];

  rescueStationName = {
    deviceName: 'Rescue Station',
    callSign: 'RSCST1',
  };

  constructor(
    private boatNameService: BoatNameService,
  ) {}
}
