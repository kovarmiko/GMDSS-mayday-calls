import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { catchError, filter, share, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {
  ClientsMessage,
  ConnectionMessage,
  DistressMessage,
  MessageType,
} from '../../types/types';
import { handleErrors } from '../../helpers/helpers';
import { WebSocketFactoryService } from './websocket-factory.service';

@Injectable()
export class MessageService {
  public ready$ = new Subject();
  public closed$ = new Subject();
  public transmission$!: Observable<DistressMessage>;
  public connectedClients$!: Observable<ClientsMessage>;
  public socket$: WebSocketSubject<MessageType> | null = null;

  constructor(
    private webSocketFactory: WebSocketFactoryService,
  ) {}

  public connect(url: string): {
    clients$: Observable<ClientsMessage>;
    transmission$: Observable<DistressMessage>;
    connections$: Observable<ConnectionMessage>;
  } {
    
    this.socket$ =  this.webSocketFactory.makeSocket<MessageType>({
      url,
      serializer,
      openObserver: this.ready$,
      closeObserver: this.closed$,
    });

    const transmission$ = this.socket$.pipe(
      filter(
        (m: MessageType): m is DistressMessage =>
          typeof m !== 'string' && m.type === 'transmission'
      ),
      catchError(handleErrors),
      share()
    );

    const clients$ = this.socket$.pipe(
      tap((m) => console.log('connected clients', m)),
      filter(
        (m: MessageType): m is ClientsMessage =>
          typeof m !== 'string' && m.type === 'client'
      ),

      catchError(handleErrors),
      share()
    );
    const connections$ = this.socket$.pipe(
      filter(
        (m: MessageType): m is ConnectionMessage =>
          typeof m !== 'string' &&  (m.type === 'connect' || m.type === 'disconnect')
      ),
      catchError(handleErrors),
      share()
    );

    return { clients$, transmission$, connections$ };
  }

  sendMessage(message: MessageType): void {
    this.socket$?.next(message);
  }

  close() {
    this.socket$?.complete();
    this.socket$ = null;
  }
}

function serializer(val: MessageType): string {
  return JSON.stringify(val);
}
