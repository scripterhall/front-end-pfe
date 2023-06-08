import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dossier } from '../model/dossier';
import { Observable, map } from 'rxjs';

const URL = "http://localhost:9999/sauvegarder-dossier-service/dossiers"

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private http:HttpClient) { }

  sauvegarderDossier(dossier:Dossier){
    const formData = new FormData();
    formData.append('file', dossier.donnees.get('compressedFile'));
    formData.append('nomDossier', dossier.nomDossier);
    formData.append('membreId', dossier.membreId.toString());
    formData.append('projetId', dossier.projetId.toString());
    const httpOptions = {
      headers: new HttpHeaders()
    };
    return this.http.post<Dossier>(URL, formData, httpOptions);
  }


  recupererDossierDeProjet(idProjet:number){

    return this.http.get<Dossier[]>(`${URL}/projet/`+idProjet,{observe:'response'})
    .pipe(
      map(response => {
        const dosProjet: Dossier[] = response.body;
        if(response.status ===404)
          return null
        return dosProjet;
      })
    )

  }

  supprimerDos(id:number){
    return this.http.delete(`${URL}/`+id)
  }
}
