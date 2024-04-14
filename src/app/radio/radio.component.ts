import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { createMessageForm } from '../forms/forms';
import {
  Client,
  ConnectionMessage,
  DistressMessage,
  RenameMessage,
} from '../types/types';
import { MessageService } from '../core/services/message.service';
import { Subscription } from 'rxjs';
import { DeviceName } from '../app.component';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'safety-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [MessageService],
})
export class RadioComponent implements OnInit, OnDestroy {
  @Input() set name(info: Client) {
    this.callSign = info.callSign;
    this.deviceName = info.deviceName;
    this.receivedName = { ...info };
  }

  @Input() type: 'boat' | 'station' = 'boat';
  public messageForm = createMessageForm();
  public messages: DistressMessage[] = [];

  public deviceName = '';
  public callSign = '';
  public keywords = '';
  public receivedName!: DeviceName;

  private sub = new Subscription();

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    // don't send message for radar if you are not a boat
    if (this.type !== 'station') {
      this.sub.add(
        this.messageService.ready$.subscribe(() => {
          this.messageService.sendMessage(
            this.createConnectionMessage('connect')
          );
        })
      );
    }

    this.sub.add(
      this.messageService.closed$.subscribe(() => {
        this.messageService.sendMessage(
          this.createConnectionMessage('disconnect')
        );
      })
    );

    // TODO: move web socket url into .env file
    const { transmission$ } = this.messageService.connect(
      environment.wssUrl
    );

    this.sub.add(
      transmission$.subscribe({
        next: (m) => m && this.receiveMessage(m),
        error: (e: unknown) => console.error(e),
        complete: () => console.info('completed clients transmission'),
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  sendMessage(): boolean {
    const { message } = this.messageForm.value;

    if (this.messageForm.invalid) {
      return false;
    }

    console.log(`Boat ${this.deviceName} sending message: ${message}`);
    const distressMessage: DistressMessage = {
      callSign: this.callSign,
      deviceName: this.deviceName,
      message: message ?? '',
      type: 'transmission',
      timestamp: Date.now(),
    };
    this.messageService.sendMessage(distressMessage);
    return true;
  }

  receiveMessage(message: DistressMessage): void {
    console.log(`Boat ${this.deviceName} received message:`, message);
    this.messages = [...this.messages, message];
    if (this.type === 'station') {
      this.alertUser(message);
    }
  }

  alertUser(message: DistressMessage) {
    const keyWords = this.keywords
      .split(',')
      .map((word) => word.toLowerCase().trim());
    const messageWords = message.message
      .replace(/[\W]+/, ' ')
      .split(' ')
      .map((word) => word.toLowerCase().trim());

    messageWords.some((word) => {
      if (keyWords.includes(word)) {
        alert(
          `user: ${message.deviceName} issued message ${message.message} containing keyword: ${word}`
        );
        return true;
      }
      return false;
    });
  }

  changeDeviceName() {
    if (
      this.deviceName === this.receivedName.deviceName &&
      this.callSign === this.receivedName.callSign
    ) {
      return;
    }

    const message: RenameMessage = {
      old: this.receivedName,
      type: 'rename',
      deviceName: this.deviceName,
      callSign: this.callSign,
    };

    this.messageService.sendMessage(message);
  }

  private createConnectionMessage(
    type: ConnectionMessage['type']
  ): ConnectionMessage {
    return {
      deviceName: this.deviceName,
      callSign: this.callSign,
      type,
    };
  }
}
