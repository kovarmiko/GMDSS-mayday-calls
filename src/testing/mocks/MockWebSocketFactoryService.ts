import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WebSocketSubject, WebSocketSubjectConfig, webSocket } from "rxjs/webSocket";

@Injectable({
    providedIn: 'root',
})
export class MockWebSocketFactoryService {

  constructor(){}

  public makeSocket<T>(_urlConfigOrSource: string | WebSocketSubjectConfig<T>): WebSocketSubject<T> {
    return new Subject<T>() as any
  }
}
