import { Backlog } from "./backlog";
import { TicketHistoire } from "./ticket-histoire";

export class ProductBacklog extends Backlog {
    public id?:number;//identifiant de backlog
    public velocite?:number;
    public histoireTickets:TicketHistoire[]//les histoireTicket appartenant au backlog
    public projetId?:number;
}
