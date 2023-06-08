import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { TicketHistoire } from '../model/ticket-histoire';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketTicketHistoireService {


  ws:WebSocketSubject<any>
  messageModifier$:Observable<TicketHistoire>
  constructor() { }

  connect(){
     this.ws = webSocket("ws://localhost:8086/histoire")
     return this.ws
  }

  disconnect(err?) {
    if (err) { console.error(err); }
    console.log('Disconnected ticket histoire');
  }

  messageHandlingModifier(ticketHistoire:TicketHistoire){
    this.messageModifier$ = this.ws.multiplex(
      () => ({modifier: ticketHistoire}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.messageModifier$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }




}
