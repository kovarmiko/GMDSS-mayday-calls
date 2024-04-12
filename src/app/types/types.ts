export interface Client {
  boatName: string;
  boatCallSign: string;
}

export interface DistressMessage extends Client {
  timestamp: number;
  message: string;
  type: 'transmission';
}

export interface ConnectionMessage extends Client {
  type: 'connect' | 'disconnect';
}
export interface RenameMessage extends Client {
  old: Client;
  type: 'rename';
}

export interface ClientsMessage {
  clients: Client[];
  type: 'client'
}

export type MessageType =
  | DistressMessage
  | ConnectionMessage
  | RenameMessage
  | ClientsMessage;
