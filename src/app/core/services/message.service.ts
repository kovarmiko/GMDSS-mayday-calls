import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { catchError, share, } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MessageType } from '../../types/types';
import { createEmptyMessage } from '../../helpers/helpers';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private socket$: WebSocketSubject<MessageType> | null = null;

  private messages$: Observable<MessageType> = of(createEmptyMessage());

  constructor() {}

  public connect(url: string): Observable<MessageType> {
    if (!this.socket$) {
      this.socket$ = webSocket<MessageType>({ url, serializer});
      this.messages$ = this.socket$.pipe(
        catchError((error) => {
          console.error('WebSocket error!', error);
          return EMPTY;
        }),
        share() // Share the same connection among multiple subscribers
      );
    }

    return this.messages$;
  }

  sendMessage(boatName: string, boatCallSign: string, message: string): void {
    this.socket$?.next({
      boatName,
      boatCallSign,
      message,
      timestamp: Date.now(),
    });
  }

  close() {
    this.socket$?.complete();
    this.socket$ = null;
  }
}

function serializer(val: MessageType): string {
  return JSON.stringify(val);
}
