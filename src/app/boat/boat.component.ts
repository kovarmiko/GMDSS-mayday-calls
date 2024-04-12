import { Component, Input } from '@angular/core';
import { Boat } from '../app.component';

@Component({
  selector: 'boat',
  templateUrl: './boat.component.html',
  styleUrl: './boat.component.scss'
})
export class BoatComponent {
  @Input() set name(info: Boat) {
    this.callSign = info.callSign
    this.boatName = info.deviceName
  }

  public boatName = ''
  callSign = ''


}
