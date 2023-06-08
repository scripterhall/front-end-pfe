import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';

const URL = "https://www.virustotal.com/api/v3"
@Injectable({
  providedIn: 'root'
})
export class AntiVerusService {
  private fileId: string;
  constructor(private http: HttpClient) { }

  async checkVerus(zip:JSZip){
    const headers = new HttpHeaders({ 'x-apikey': 'bcd1c2d59bd5ab523210924010bd3da867853fdf41f7145a35f10e4882af886f' });
    const content :Blob = await zip.generateAsync({type:'blob'})
    let formData = new FormData();
    formData.append("file",content);
    return this.http.post<any>(`${URL}/files`,formData,{headers:headers}).toPromise().then(
      response => {
        this.fileId = response.data.id;
        return response;
      }
    );
    
  }

  getReport() {
    const headers = new HttpHeaders({ 'x-apikey': 'bcd1c2d59bd5ab523210924010bd3da867853fdf41f7145a35f10e4882af886f' });
    return this.http.get<any>(`${URL}/analyses/${this.fileId}`, { headers: headers });
  }

}
