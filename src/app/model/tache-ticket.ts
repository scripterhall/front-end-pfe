import { Membre } from "./membre";
import { SprintBacklog } from "./sprint-backlog";
import { Ticket } from "./ticket";
import { TicketHistoire } from "./ticket-histoire";

export class TacheTicket extends Ticket{

    public id?:number ; //idantifiant de tache ticket
    public nbHeurs?:number ;//nombnre d heurs 
    public membre?:Membre; // a quel membere est affecter le ticket
    public membreId?:number;
    public etat?:string;
    public dateLancement?:Date;
    public dateFin?:Date;
    public ticketHistoireId ?:number;
    public ht?:TicketHistoire;
    public sprintBacklogId?:number;
    public sprintBacklog?:SprintBacklog //dans quelle sprintBacklog appartient

}
