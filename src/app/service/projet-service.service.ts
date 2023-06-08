import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Projet } from '../model/projet';

const url1 = "http://localhost:9999/initialiser-projet-service/projets"

@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {



  constructor(private http: HttpClient) { }

  public getListProjetChefProjet(idChef:number){
    return this.http.get<Projet[]>(`${url1}/chefProjets/`+idChef,{ observe: 'response' })
    .pipe(
      map(response => {
        const projets: Projet[] = response.body;
        if(response.status ===404 || response.status===500 )
          return []
        return projets;
      }));
  }

  public ajouterProjetByChef(projet:Projet){
    return this.http.post<Projet>(url1,projet);
  }

  getProjetByIdFromLocalStorage(){
    let projetCourantStr = localStorage.getItem("projet");
    let projetCourantObj = JSON.parse(projetCourantStr);
    let id = projetCourantObj.id;
    console.log("id projet courant = "+id);
    return id;
  }

  getProjetFromLocalStorage(){
    let projetCourantStr = localStorage.getItem("projet");
    let projetCourantObj = JSON.parse(projetCourantStr);
    return projetCourantObj;
  }

}
