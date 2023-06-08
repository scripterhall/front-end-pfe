import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SprintBacklog } from '../model/sprint-backlog';

const URL = "http://localhost:9999/sprint-backlog-service/sprint-backlogs"
@Injectable({
  providedIn: 'root'
})
export class SprintBacklogService {

  constructor(private http:HttpClient) { }

  //ajouter sprint backlog
  genererSprintBacklog(sprintBacklog:SprintBacklog){
    return this.http.post<SprintBacklog>(`${URL}`,sprintBacklog, { observe: 'response' })
    .pipe(
      map(response => {
        const createdSprintBacklog: SprintBacklog = response.body;
        console.log(response.status);
        if(response.status === 404) {
          return null;
        }
        return createdSprintBacklog;
      })
    );
  }

  modifierSprintBackog(sprintBacklog:SprintBacklog){
    return this.http.put<SprintBacklog>(`${URL}`,sprintBacklog,{ observe: 'response' })
    .pipe(
      map(response => {
        const modifiedSprintBacklog: SprintBacklog = response.body;
        if(response.status === 404) {
          return null;
        }
        return modifiedSprintBacklog;
      })
    )
  }

  afficherSprintBacklogBySprintId(idSprint:number){
    return this.http.get<SprintBacklog>(`${URL}/sprint/`+idSprint,{ observe: 'response' })
    .pipe(
      map(response => {
        
        const sprintBacklog: SprintBacklog = response.body;
        if(response.status ===404)
          return null;
        return sprintBacklog;
      }))
  }

  
  

}
