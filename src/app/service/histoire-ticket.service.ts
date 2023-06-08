import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketHistoire } from '../model/ticket-histoire';
const url1 = "http://localhost:9999/gestion-histoire-ticket/histoireTickets"

@Injectable({
  providedIn: 'root'
})
export class HistoireTicketService {

  constructor(private http: HttpClient) { }

  efforts: number[] = [1, 2, 3, 5, 8, 13];
  priorities: string[] = ['Haute', 'Moyenne', 'Faible'];

  public getListHistoireTicketByProductBacklog(productBacklogId:number){
    return this.http.get<TicketHistoire[]>(`${url1}/productBacklog/`+productBacklogId);
  }

  addTicket(ticket: TicketHistoire): Observable<TicketHistoire> {
    return this.http.post<TicketHistoire>(`${url1}`,ticket);
  }

  removeUserStoryFromProductBacklog(id: number): Observable<any> {
    const url = `${url1}/${id}`;
    return this.http.put(url, null);
  }

  assignUserStoryToSprint(histoireTicketId: number, sprintId: number): Observable<TicketHistoire> {
    const url = `${url1}/${histoireTicketId}/sprint/${sprintId}`;
    return this.http.put<TicketHistoire>(url, null);
  }

  assignUserStoryToProductBacklog(histoireTicketId: number, productBacklogId: number): Observable<TicketHistoire> {
    const url = `${url1}/${histoireTicketId}/productBacklog/${productBacklogId}`;
    return this.http.put<TicketHistoire>(url, null);
  }

  getUserStoryById(id: number): Observable<TicketHistoire> {
    const url = `${url1}/${id}`;
    return this.http.get<TicketHistoire>(url);
  }

  deleteUserStoryById(id: number): Observable<any> {
    return this.http.delete(`${url1}/${id}`);
  }

  addNewUserStory(userStory: TicketHistoire): Observable<any> {
    const url = `${url1}/new`;
    return this.http.post(url, userStory);
  }

  getHistoireTicketBySprintId(idSprint:number){
    return this.http.get<TicketHistoire[]>(`${url1}/sprint/`+idSprint);
  }

  DetacherHtSprint(histoireTicket:TicketHistoire){
    return this.http.put(`${url1}`,histoireTicket)
  }

  updateUserStory(id: number, histoireTicket: TicketHistoire): Observable<TicketHistoire> {
    const url = `${url1}/histoireTicket/${id}`;
    return this.http.put<TicketHistoire>(url, histoireTicket);
  }


}
