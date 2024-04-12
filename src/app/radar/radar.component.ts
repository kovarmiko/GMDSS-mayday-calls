import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../core/services/message.service';
import { Client, ClientsMessage, ConnectionMessage } from '../types/types';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'safety-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
  providers: [MessageService],
})
export class RadarComponent
  implements OnInit
{
  @Input() set name(info: { deviceName: string; callSign: string }) {
    this.callSign = info.callSign;
    this.deviceName = info.deviceName;
  }

  boatsInRange: Client[] = [];

  deviceName = '';
  callSign = '';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.ready$.subscribe(() => {
      this.messageService.sendMessage(this.createConnectionMessage('connect'));
    });

    this.messageService.closed$.subscribe(() => {
      this.messageService.sendMessage(
        this.createConnectionMessage('disconnect')
      );
    });

    const { clients$ } = this.messageService.connect('ws://localhost:8080');
    clients$
    .pipe(takeUntil(this.messageService.closed$))
    .subscribe({
      next: (m) => m && this.updateBoats(m),
      error: (e: unknown) => console.error(e),
      complete: () => console.info('completed clients transmission'),
    });

  }

  private updateBoats(message: ClientsMessage) {
    this.boatsInRange = message.clients || [];
  }

  private createConnectionMessage(
    type: ConnectionMessage['type']
  ): ConnectionMessage {
    return {
      boatName: this.deviceName,
      boatCallSign: this.callSign,
      type,
    };
  }
}
