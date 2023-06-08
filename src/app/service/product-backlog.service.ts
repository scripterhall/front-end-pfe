import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductBacklog } from '../model/product-backlog';
import { TicketHistoire } from '../model/ticket-histoire';
const url1 = "http://localhost:9999/gestion-product-backlog/product-backlogs"

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogService {

  constructor(private http: HttpClient) { }

  public getProductBacklogById(productBacklogId:number){
    return this.http.get<ProductBacklog[]>(`${url1}/`+productBacklogId);
  }

  public getProductBacklogByIdProjet(idProjet: number) {
    const url = `${url1}/projet/${idProjet}`;
    return this.http.get<ProductBacklog>(url);
  }

  getHistoireTicketsByProductBacklogId(productBacklogId: number): Observable<TicketHistoire[]> {
    return this.http.get<TicketHistoire[]>(`${url1}/${productBacklogId}/histoiresTickets`);
  }

  createProductBacklog(productBacklog: ProductBacklog, projectId: number): Observable<ProductBacklog> {
    productBacklog.projetId = projectId;
    return this.http.post<ProductBacklog>(`${url1}?projectId=${projectId}`, productBacklog);
  }

  getProductBacklogByIdFromLocalStorage(){
    let productBacklogCourantStr = localStorage.getItem("productBacklogCourant");
    let productBacklogCourantObj = JSON.parse(productBacklogCourantStr);
    let id = productBacklogCourantObj.id;
    console.log("id product backlog courant = "+id);
    return id;
  }

  elevateProductBacklogVelocity(productBacklogId: number, effort: number) {
    const url = `${url1}`;
    const body = { productBacklogId, effort };
    return this.http.put(url, body);
  }

  decreaseProductBacklogVelocity(productBacklogId: number, histoireTicketId: number): Observable<any> {
    const url = `${url1}/`;
    const requestBody = { productBacklogId, histoireTicketId };
    return this.http.put(url, requestBody);
  }
}
