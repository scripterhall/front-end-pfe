import { ChefProjet } from "./chef-projet";

export class Projet {

    public id?:number;//identifiant projet
    public nom?:String;//le nom de projet
    public dateDebut?:Date //date debut de projet
    public dateFin?:Date //date fin de projet
    public cles ?:String //cles unique de projet
    public chefProjetId?:number;
    public chefProjet?:ChefProjet //le realisateur de projet
    public checked?:boolean=false;//juste pour le front case a cocher
}
