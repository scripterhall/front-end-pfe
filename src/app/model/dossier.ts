import { Membre } from "./membre";
import { Projet } from "./projet";

export class Dossier {

    public id?:number;
    public projetId?:number;
    public membreId?:number;
    public projet?:Projet;
    public membre?:Membre;
    public donnees?:FormData;
    public nomDossier?:string;

}
