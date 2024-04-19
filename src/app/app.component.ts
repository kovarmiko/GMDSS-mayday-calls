import { Component, OnInit } from '@angular/core';
import { BoatNameService } from './core/services/boat-name.service';
import { MessageService } from './core/services/message.service';
import { environment } from '../environments/environment.development';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const { connections$ } = this.messageService.connect(environment.wssUrl);

    connections$.subscribe((m) => {
      if (m.type === 'disconnect') {
        this.boats = this.boats.filter((boat) => boat.callSign !== m.callSign);
      }
    });
  }
}
