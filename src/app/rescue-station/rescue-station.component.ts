import { Component, Input } from '@angular/core';
import { DeviceName } from '../app.component';

@Component({
  selector: 'rescue-station',
  templateUrl: './rescue-station.component.html',
  styleUrl: './rescue-station.component.scss'
})
export class RescueStationComponent {

  @Input() set name(info: DeviceName) {
    this.callSign = info.callSign
    this.deviceName = info.deviceName
  }

  public deviceName = ''
  public callSign = ''

}
