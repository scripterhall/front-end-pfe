import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Dossier } from '../model/dossier';


@Injectable({
  providedIn: 'root'
})
export class WebSocketDossierService {

  ws: WebSocketSubject<any>;
  message$: Observable<any>;
  messageSupprimer$:Observable<Dossier>

  constructor() { }


  connect() {
    this.ws = webSocket('ws://localhost:8101/dossier'); 
    return  this.ws
   }

   disconnect(err?) {
    if (err) { console.error(err); }
    console.log('Disconnected dossier');
  }

  messageHandlingAddDos(dossier:Dossier){
    
    this.message$ = this.ws.multiplex(
      () => ({subscribe: dossier}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.message$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }

  messageHandlingSupprimerDos(dossier:Dossier){
    
    this.messageSupprimer$ = this.ws.multiplex(
      () => ({supprimer: dossier}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    )
    this.messageSupprimer$.subscribe(
      error => this.disconnect(error),
      () => this.disconnect()
    );
    return this.ws
  }

}
