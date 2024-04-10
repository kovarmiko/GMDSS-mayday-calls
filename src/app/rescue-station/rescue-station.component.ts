import { Component } from '@angular/core';
import { RadioDevice } from '../core/abstract-classes/radio-device';

@Component({
  selector: 'safety-rescue-station',
  templateUrl: './rescue-station.component.html',
  styleUrls: ['./rescue-station.component.scss']
})
export class RescueStationComponent extends RadioDevice {
  boatsInRange: string[] = []; // Example additional property

  constructor() {
    super('Rescue Station 1', 'RS100');
  }

  sendMessage(message: string): void {
    console.log(`Rescue Station sending message: ${message}`);
    // Implementation for sending a message
  }

  receiveMessage(message: string): void {
    console.log(`Rescue Station received message: ${message}`);
    // Implementation for handling a received message, including keyword detection
  }

  // Additional methods specific to the rescue station
  addBoatInRange(boatName: string): void {
    this.boatsInRange.push(boatName);
  }
}
