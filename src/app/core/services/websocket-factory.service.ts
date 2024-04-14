import { Injectable } from "@angular/core";
import { WebSocketSubject, WebSocketSubjectConfig, webSocket } from "rxjs/webSocket";

@Injectable({
    providedIn: 'root',
})
export class WebSocketFactoryService {

  constructor(){}

  public makeSocket<T>(urlConfigOrSource: string | WebSocketSubjectConfig<T>): WebSocketSubject<T> {
    return webSocket<T>(urlConfigOrSource);
  }
}