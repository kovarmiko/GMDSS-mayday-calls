import { Injectable } from '@angular/core';

let boats = [
  { boatName: 'Aurora', callSign: 'KJNA' },
  { boatName: 'Borealis', callSign: 'ZGHB' },
  { boatName: 'Calypso', callSign: 'XPMC' },
  { boatName: 'Discovery', callSign: 'QWER' },
  { boatName: 'Endeavour', callSign: 'TYUI' },
  { boatName: 'Freedom', callSign: 'ASDF' },
  { boatName: 'Galaxy', callSign: 'GHJK' },
  { boatName: 'Horizon', callSign: 'LZXC' },
  { boatName: 'Intrepid', callSign: 'VBNM' },
  { boatName: 'Jubilee', callSign: 'ERDF' },
  { boatName: 'Kestrel', callSign: 'CVBN' },
  { boatName: 'Liberty', callSign: 'WERG' },
  { boatName: 'Mystic', callSign: 'SDFG' },
  { boatName: 'Navigator', callSign: 'XCVB' },
  { boatName: 'Odyssey', callSign: 'RTYU' },
  { boatName: 'Pioneer', callSign: 'FGHJ' },
  { boatName: 'Quest', callSign: 'BNMA' },
  { boatName: 'Ranger', callSign: 'QAZX' },
  { boatName: 'Sovereign', callSign: 'WSXC' },
  { boatName: 'Tranquility', callSign: 'EDCV' },
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
