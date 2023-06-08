import { Invitation } from "./invitation";
import { RolePk } from "./keys/role-pk";
import { Membre } from "./membre";
import { Projet } from "./projet";

export class Role {

    public pk?:RolePk //identifiant de role
    public type ?:string // type de role ::::: PO,dev team ..
    public permission ?:string; //les fonctionalite qui peut effectuer sur le projet
    public description?:string;//description du role
    public membre?:Membre //qui a le role
    public status?:string;//ATTENTE,ACCEPTE
    public projet?:Projet;//dons quelle projet
    public invitation?:Invitation

}
