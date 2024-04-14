import { Component, OnInit } from '@angular/core';
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

  addBoat() {
    this.boats = [
      this.boatNameService.getFirstAvailableBoatName(),
      this.boatNameService.getFirstAvailableBoatName(),
      this.boatNameService.getFirstAvailableBoatName(),
    ];
  }

  ngOnInit() {
    // const { clients$ } = this.messageService.connect('ws://localhost:8080');

    // clients$.subscribe((clients) => {
    //   this.boats = clients.clients;
    // });
  }
}
