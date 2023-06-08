import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TacheTicket } from '../model/tache-ticket';
import { map } from 'rxjs';

const URL = "http://localhost:9999/corbeille-service/corbeilles"
@Injectable({
  providedIn: 'root'
})
export class CorbeilleService {

  constructor(private http:HttpClient) { }

  getTacheCorbeilleByMembreId(id:number){
    return this.http.get<TacheTicket[]>(`${URL}/membre/`+id,{observe:'response'})
    .pipe(
      map(response => {
        const ticketsTache:TacheTicket[] = response.body
        if(response.status === 400 || response.status === 500)
          return null
        return ticketsTache
      })
    )
  }

  deleteTacheFromCorbeille(id:number,choix:string){
    let params = new HttpParams().set("choix",choix)
    return this.http.delete<void>(`${URL}/`+id,{params:params});
  }


  viderCorbeille(){
    return this.http.delete<void>(URL,{observe:'response'})
    .pipe(
      map(
        response => {
          if(response.status === 404)
            return null
          else
            return "votre corveille est vide"
        }
      )
    )
  }

  regenererTacheSupprimer(ticketTache:TacheTicket){
    return this.http.post<TacheTicket>(`${URL}`,ticketTache,{observe:'response'})
    .pipe(
      map(
        reponse =>{
          const tache:TacheTicket = reponse.body
          if(reponse.status == 400)
            return null
          return tache
        }
      )
    )
  }

}
