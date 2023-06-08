import { Membre } from "./membre";

export class VisioConference {

    public id?:number;//identifiant de visioConference
    public start_time?:Date;//commencer le sprint
    public end_time?:Date;//fin de conference
    public membre?:Membre[];//liste membre dans la visoConference

}
