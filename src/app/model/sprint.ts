import { ProductBacklog } from "./product-backlog";
import { SprintBacklog } from "./sprint-backlog";

export class Sprint {

    public id?:number;
    public dateLancement?:Date; // date de debut de traivail dans le sprint
    public dateFin?:Date ;//respecter le timebox
    public velocite?:number;//nombre d'effort prix dans le sprint
    public etat?:string;// sprint en cours , en attente ,annuler ,terminer ...
    public objectif?:string;
    public productBacklogId?:number;
    public productBacklog?:ProductBacklog;
    public sprintBacklog?:SprintBacklog //chaque sprint contient un sprint backlog couplage fort
}
