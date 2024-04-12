import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import {
  catchError,
  filter,
  share,
  tap,
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {
  ClientsMessage,
  DistressMessage,
  MessageType,
  RenameMessage,
} from '../../types/types';
import {
  handleErrors,
} from '../../helpers/helpers';

@Injectable()
export class MessageService {
  public ready$ = new Subject();
  public closed$ = new Subject();
  public transmission$!: Observable<DistressMessage>;
  public connectedClients$!: Observable<ClientsMessage>;
  public socket$: WebSocketSubject<MessageType> | null = null;

  constructor() {}

  public connect(url: string): {
    clients$: Observable<ClientsMessage>;
    transmission$: Observable<DistressMessage>;
  } {
    this.socket$ = webSocket<MessageType>({
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
      tap((m) => console.log('connected client', m)),
      filter(
        (m: MessageType): m is ClientsMessage =>
          typeof m !== 'string' && m.type === 'client'
      ),
      catchError(handleErrors),
      share()
    );

    return { clients$, transmission$};
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
