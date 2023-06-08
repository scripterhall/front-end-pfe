import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Invitation } from '../model/invitation';
import { Projet } from '../model/projet';

const URL = 'http://localhost:9999/invitation-service/invitations'

interface Request {
  invitation: Invitation;
  projet: Projet;
}

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http:HttpClient) { }

  envoyerInvitation(request:Request){
    return this.http.post<Invitation>(URL+"/invitation",request);
  }


  supprimerInvitation(id:number){
    return this.http.delete(`${URL}/`+id,{observe:'response'})
    .pipe(
      map(response =>{
        if(response.status === 404)
          return "erreur de suppression"
      })
    )
  }

  resetMotDePass(email:String){
    const param = new HttpParams().set("email",email.toString());
    return this.http.get<string>(`${URL}/users`,{params:param});
  }

}
