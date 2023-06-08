import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { map } from 'rxjs';
import { Reponse } from '../model/reponse';

const URL = "http://localhost:9999/chat-bot-service/reponses"

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http:HttpClient) { }


  poserQuestion(question:Question){
    return this.http.post<Reponse>(URL,question,{observe:'response'})
    .pipe(
      map(response=>{
        if(response.status === 400){
          const chaineErreur = response.body
          return chaineErreur
        }
        const reponse = response.body
        return reponse
      })
    )
  }

  recuperListeReponseMembre(membreId:number){
    let params = new HttpParams().set("membreId",membreId.toString())
    return this.http.get<Reponse[]>(URL,{params:params,observe:'response'})
    .pipe(
      map(response =>{
        if(response.status === 400)
          return null
        const reponses = response.body
        return reponses  
      })
    )
  }

}
