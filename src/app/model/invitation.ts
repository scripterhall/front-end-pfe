import { ChefProjet } from "./chef-projet";

import { Membre } from "./membre";
import { Role } from "./role";

export class Invitation {


    public id?:number;//identifiant de l'invitation
    public chefProjetId?:number//identifiant de chef projet
    public emailInvitee?:string; // l'email pour acheminer l'invitation
    public membreId?:number;
    public chefProjet:ChefProjet// qui a envoyer l'invitation
    public membre:Membre//l'invitee
    public dateExpiration?:Date

}
