import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RadioDevice } from '../core/abstract-classes/radio-device';
import { createMessageForm } from '../forms/forms';
import { MessageType } from '../types/types';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'safety-boat',
  templateUrl: './boat.component.html',
  styleUrl: './boat.component.scss',
})
export class BoatComponent extends RadioDevice implements AfterContentInit {
  public messageForm = createMessageForm();

  constructor(private messageService: MessageService ) {
    // Assume 'Ernie' and 'AT2302' are default values or passed from parent component
    super('Ernie', 'AT2302');
  }

  ngAfterContentInit() {
    // Connect to WebSocket server and subscribe to messages
    this.messageService.connect('ws://localhost:8080').subscribe({
      next: (m: MessageType) => this.receiveMessage(m),
      error: (e: unknown) => console.error(e),
      complete: () => console.info('complete'),
    });

  }

  sendMessage(): void {
    const { message } = this.messageForm.value;

    if (!message) {
      return;
    }

    console.log(`Boat ${this.deviceName} sending message: ${message}`);
    // Implementation for sending a message, e.g., using a WebSocket service
    this.messageService.sendMessage(this.deviceName, this.callSign, message);
    this.messageForm.reset();
  }

  receiveMessage(message: MessageType): void {
    console.log(`Boat ${this.deviceName} received message:` , message);
    // Implementation for handling a received message
  }
}
