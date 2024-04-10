export interface DistressMessage {
  boatName: string;
  boatCallSign: string;
  timestamp: number;
  message: string;
}

export type MessageType = DistressMessage | string ;
