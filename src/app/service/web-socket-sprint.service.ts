import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Sprint } from '../model/sprint';

@Injectable({
  providedIn: 'root'
})
export class WebSocketSprintService {

  ws: WebSocketSubject<any>;
  message$: Observable<Sprint>;
  messageSupprimer$: Observable<Sprint>;
  messageModifier$: Observable<Sprint>;

  constructor() { }

  connect() {
    this.ws = webSocket('ws://localhost:8089/sprint');
    return  this.ws
   }

   disconnect(err?) {
    if (err) { console.error(err); }
    console.log('Disconnected sprint');
  }

  messageHandlingAdd(sprint:Sprint){
    this.message$ = this.ws.multiplex(
      () => ({subscribe: sprint}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.message$.subscribe(
      // error => this.disconnect(error),
      // () => this.disconnect()
    );
    return this.ws
  }

  messageHandlingSupprimer(sprint:Sprint){
    this.messageSupprimer$ = this.ws.multiplex(
      () => ({supprimer: sprint}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.messageSupprimer$.subscribe(
      // error => this.disconnect(error),
      // () => this.disconnect()
    );
    return this.ws
  }

  messageHandlingModifier(sprint:Sprint){
    this.messageModifier$ = this.ws.multiplex(
      () => ({modifier: sprint}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.messageModifier$.subscribe(
      // error => this.disconnect(error),
      // () => this.disconnect()
    );
    return this.ws
  }



}
