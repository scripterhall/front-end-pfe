import { Membre } from "./membre";
import { Projet } from "./projet";

export class Ressource {

    public id?:number; //identifiant de ressource
    public titre?:string;//le titre de ressource
    public Projet?:Projet; //le ressource appartient a quel projet
    public chemain?:string;// le lien local de ressource
    public membre:Membre;//qui a deposer le ressource

}
