import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../core/services/message.service';
import { Client, ClientsMessage, ConnectionMessage } from '../types/types';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'safety-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
  providers: [MessageService],
})
export class RadarComponent implements OnInit, OnDestroy {
  @Input() set name(info: { deviceName: string; callSign: string }) {
    this.callSign = info.callSign;
    this.deviceName = info.deviceName;
  }

  private sub = new Subscription();

  boatsInRange: Client[] = [];

  deviceName = '';
  callSign = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // keep this logic for future need
    this.sub.add(
      this.messageService.ready$.subscribe(() => {
      
      })
    );

    this.sub.add(
      this.messageService.closed$.subscribe(() => {
        this.messageService.sendMessage(
          this.createConnectionMessage('disconnect')
        );
      })
    );

    const { clients$ } = this.messageService.connect('ws://localhost:8080');
    this.sub.add(
      clients$.pipe(takeUntil(this.messageService.closed$)).subscribe({
        next: (m) => m && this.updateBoats(m),
        error: (e: unknown) => console.error(e),
        complete: () => console.info('completed clients transmission'),
      })
    );
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

  private updateBoats(message: ClientsMessage) {
    this.boatsInRange = message.clients || [];
  }

  private createConnectionMessage(
    type: ConnectionMessage['type']
  ): ConnectionMessage {
    return {
      deviceName: this.deviceName,
      boatCallSign: this.callSign,
      type,
    };
  }
}
