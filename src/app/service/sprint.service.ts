import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint } from '../model/sprint';
const url1 = "http://localhost:9999/gestion-sprints-service/sprints"

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

   getListSprintsByProductBacklog(productBacklogId:number){
    return this.http.get<Sprint[]>(`${url1}/productBacklog/`+productBacklogId);
  }

   createSprint(sprint: Sprint, productBacklogId: number): Observable<Sprint> {
    return this.http.post<Sprint>(`${url1}?productBacklogId=${productBacklogId}`, sprint);
  }

   modifierSprint(sprint:Sprint){
    return this.http.put<Sprint>(`${url1}`,sprint)
  }

  supprimerSprint(id:number){
    return this.http.delete<Sprint>(`${url1}/`+id)
  }

  getSprintById(id: number) {
    return this.http.get<Sprint>(`${url1}/${id}`);
  }




}
