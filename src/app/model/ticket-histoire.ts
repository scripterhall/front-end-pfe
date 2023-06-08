import { Membre } from "./membre";
import { ProductBacklog } from "./product-backlog";
import { Projet } from "./projet";
import { Sprint } from "./sprint";
import { Ticket } from "./ticket";

export class TicketHistoire extends Ticket{


    public id?:number;
    public priorite?:string;//haute,faible,moyenne
    public status?:string;//en cours , en attente de prendre , terminer
    public effort?:number;//planing pocker
    public position?:number;//our ordonner le product backlog
    public productBacklogId?:number;
    public productBacklog?:ProductBacklog;

    public sprintId?:number;
    public sprint?:Sprint;

    public membreId?:number;
    public dateDebut?:Date;
    public dateFin?:Date;
}
