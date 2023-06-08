import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
import { TacheTicket } from '../model/tache-ticket';

export interface SocketMessage{
  methode : string
  ticketTache:TacheTicket
}

@Injectable({
  providedIn: 'root'
})


export class WebSocketTicketTacheService {

  ws: WebSocketSubject<any>;
  message$: Observable<TacheTicket>;
  messageSupprimer$: Observable<TacheTicket>;
  messageModifier$: Observable<TacheTicket>;
  ticketTache:TacheTicket

  connect() {
   this.ws = webSocket('ws://localhost:8093/tache');
   return  this.ws
  }

  disconnect(err?) {
    if (err) { console.error(err); }
    console.log('Disconnected ticket tâche');
  }

  messageHandlingAdd(ticketTache:TacheTicket){
    this.message$ = this.ws.multiplex(
      () => ({subscribe: ticketTache}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.message$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }

  messageHandlingSupprimer(ticketTache:TacheTicket){
    this.messageSupprimer$ = this.ws.multiplex(
      () => ({supprimer: ticketTache}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.messageSupprimer$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }

  messageHandlingModifier(ticketTache:TacheTicket){
    this.messageModifier$ = this.ws.multiplex(
      () => ({modifier: ticketTache}),
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
