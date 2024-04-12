import { Injectable } from '@angular/core';

let boats = [
  { deviceName: 'Aurora', callSign: 'KJNA' },
  { deviceName: 'Borealis', callSign: 'ZGHB' },
  { deviceName: 'Calypso', callSign: 'XPMC' },
  { deviceName: 'Discovery', callSign: 'QWER' },
  { deviceName: 'Endeavour', callSign: 'TYUI' },
  { deviceName: 'Freedom', callSign: 'ASDF' },
  { deviceName: 'Galaxy', callSign: 'GHJK' },
  { deviceName: 'Horizon', callSign: 'LZXC' },
  { deviceName: 'Intrepid', callSign: 'VBNM' },
  { deviceName: 'Jubilee', callSign: 'ERDF' },
  { deviceName: 'Kestrel', callSign: 'CVBN' },
  { deviceName: 'Liberty', callSign: 'WERG' },
  { deviceName: 'Mystic', callSign: 'SDFG' },
  { deviceName: 'Navigator', callSign: 'XCVB' },
  { deviceName: 'Odyssey', callSign: 'RTYU' },
  { deviceName: 'Pioneer', callSign: 'FGHJ' },
  { deviceName: 'Quest', callSign: 'BNMA' },
  { deviceName: 'Ranger', callSign: 'QAZX' },
  { deviceName: 'Sovereign', callSign: 'WSXC' },
  { deviceName: 'Tranquility', callSign: 'EDCV' },
];

@Injectable({
  providedIn: 'root',
})
export class BoatNameService {


  constructor() {}

  getFirstAvailableBoatName() {
    const [first, ...other] = boats;
    boats = [...other]
    return first;
  }

  releaseBoatName(boat: typeof boats[1]) {
    boats = [...boats, boat]
  }
}
