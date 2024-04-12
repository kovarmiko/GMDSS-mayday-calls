import { EMPTY } from 'rxjs/internal/observable/empty';
import { ClientsMessage, DistressMessage } from '../types/types';

export function createEmptyMessage(): DistressMessage {
  return {
    deviceName: '',
    boatCallSign: '',
    message: '',
    timestamp: 0,
    type: 'transmission',
  };
}
export function createEmptyClientMesage(): ClientsMessage {
  return {
    clients: [
      {
        deviceName: '',
        boatCallSign: '',
      },
    ],
    type: 'client',
  };
}

export function handleErrors(error: unknown)  {
  console.error('WebSocket error!', error);
  return EMPTY;
}
