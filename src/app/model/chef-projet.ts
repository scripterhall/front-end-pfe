import { Personne } from "./personne";

export class ChefProjet extends Personne{

    public id?:number //identifiant chef de projet
    public competanceAnalyseDonnees?:boolean
    public competanceDeGestion?:boolean
    public photo?:Uint8Array|Array<Uint8Array>
}
