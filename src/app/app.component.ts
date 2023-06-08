import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/webSocket";
import { WebSocketTicketTacheService } from "./service/web-socket-ticket-tache.service";
import { WebSocketDossierService } from "./service/web-socket-dossier.service";
import { WebSocketInvitationService } from "./service/web-socket-invitation.service";
import { WebSocketSprintService } from "./service/web-socket-sprint.service";
import { WebSocketTicketHistoireService } from "./service/web-socket-ticket-histoire.service";

interface Message {
  name: string; message: string; type: string;
}



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})



export class AppComponent implements OnInit {
  title = "gestion projet scrum";
  
  constructor(
    private webSocketService:WebSocketTicketTacheService,
    private webSocketDossierService:WebSocketDossierService,
    private webSocketInvitationService:WebSocketInvitationService,
    private webSocketSprint:WebSocketSprintService,
    private webSocketTicketHistoire:WebSocketTicketHistoireService
  ){


  }

  ngOnInit() {
    this.webSocketService.connect().subscribe()
    this.webSocketDossierService.connect().subscribe()
    this.webSocketInvitationService.connect().subscribe()
    this.webSocketSprint.connect().subscribe()
    this.webSocketTicketHistoire.connect().subscribe()

  }
}
