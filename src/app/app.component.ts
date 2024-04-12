import { Component, OnInit } from '@angular/core';
import { Client } from './types/types';
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
export class AppComponent implements OnInit {
  title = 'safety-system';

  boats: Boat[] = [];

  rescueStationName = {
    deviceName: 'Rescue Station',
    callSign: 'RSCST1',
  };

  constructor(
    private boatNameService: BoatNameService,
    private messageService: MessageService
  ) {}

  addBoat() {
    this.boats = [
      ...this.boats,
      this.boatNameService.getFirstAvailableBoatName(),
    ];
  }

  ngOnInit() {
    const { clients$ } = this.messageService.connect('ws://localhost:8080');

    clients$.subscribe((clients) => {
      this.boats = clients.clients;
    });
  }

  releaseBoat(boat: Boat) {
    this.boats = this.boats.filter((item) => item.callSign !== boat.callSign);
    this.boatNameService.releaseBoatName(boat);
  }
}
