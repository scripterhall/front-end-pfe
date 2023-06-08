import { Backlog } from "./backlog";
import { Sprint } from "./sprint";
import { TacheTicket } from "./tache-ticket";

export class SprintBacklog extends Backlog {

    public id?:number; //identifiant de sprint backlog
    public nbrHeurs?:number; // nombre d'heurs total de travail dans le sprint
    public sprint?:Sprint
    public sprintId?:number;

    public isOpen?:boolean //juste cote front pour la permutation l'affichage 

}
