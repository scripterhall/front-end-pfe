import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class WebSocketInvitationService {

  ws:WebSocketSubject<any>
  message$:Observable<any>
  constructor() { }

  connect(){
    this.ws = webSocket("ws://localhost:8085/role")
    return this.ws
  }
  disconnect(err?) {
    if (err) { console.error(err); }
    console.log('Disconnected invitation');
  }

  messageHandlingAddRole(role:Role){
    this.message$ = this.ws.multiplex(
      () => ({subscribe: role}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.message$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }

}
