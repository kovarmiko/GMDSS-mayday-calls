import { MessageType } from "../../types/types";

export abstract class RadioDevice {
  protected deviceName: string;
  protected callSign: string;

  constructor(deviceName: string, callSign: string) {
    this.deviceName = deviceName;
    this.callSign = callSign;
  }

  // Abstract method to send a message
  abstract sendMessage(message: string): void;

  // Abstract method to receive a message
  abstract receiveMessage(message: MessageType): void;

  // Common method to change the device's name or callsign
  changeIdentifier(newName: string, newCallSign: string): void {
    this.deviceName = newName;
    this.callSign = newCallSign;
  }
}
