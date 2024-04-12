import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { createMessageForm } from '../forms/forms';
import {
  ConnectionMessage,
  DistressMessage,
} from '../types/types';
import { MessageService } from '../core/services/message.service';
import { Subscription, takeUntil } from 'rxjs';
import { BoatNameService } from '../core/services/boat-name.service';
import { Boat } from '../app.component';

@Component({
  selector: 'safety-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [MessageService]
})
export class RadioComponent
  implements OnInit, OnDestroy
{
  @Input() set name(info: Boat) {
    this.callSign = info.callSign
    this.deviceName = info.boatName
  }
  public messageForm = createMessageForm();
  public messages: DistressMessage[] = [];
  public deviceName = ''
  public callSign = ''

  private sub = new Subscription()

  constructor(
    private messageService: MessageService,
    private boatNameService: BoatNameService
  ) {
    const { boatName, callSign } = boatNameService.getFirstAvailableBoatName();
  }

  ngOnInit() {
    // Connect to WebSocket server and subscribe to messages

    this.sub.add(this.messageService.ready$.subscribe(() => {
      this.messageService.sendMessage(this.createConnectionMessage('connect'));
    }));

    this.sub.add(this.messageService.closed$.subscribe(() => {
      this.messageService.sendMessage(
        this.createConnectionMessage('disconnect')
      );
    }));

    // TODO: move web socket url into .env file
    const {transmission$} = this.messageService.connect('ws://localhost:8080');


    this.sub.add(transmission$
      .subscribe({
        next: (m) => m && this.receiveMessage(m),
        error: (e: unknown) => console.error(e),
        complete: () => console.info('completed clients transmission'),
      }));
  }

  ngOnDestroy(): void {
    this.boatNameService.releaseBoatName({
      boatName: this.deviceName,
      callSign: this.callSign,
    });
    this.messageService.closed$.next(true);
    this.sub.unsubscribe()
  }

  sendMessage(): void {
    const { message } = this.messageForm.value;

    if (!message) {
      return;
    }

    console.log(`Boat ${this.deviceName} sending message: ${message}`);
    // Implementation for sending a message, e.g., using a WebSocket service
    const distressMessage: DistressMessage = {
      boatCallSign: this.callSign,
      boatName: this.deviceName,
      message: message,
      type: 'transmission',
      timestamp: Date.now(),
    };
    this.messageService.sendMessage(distressMessage);
    this.messageForm.reset();
  }

  receiveMessage(message: DistressMessage): void {
    console.log(`Boat ${this.deviceName} received message:`, message);
    this.messages = [...this.messages, message];
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
