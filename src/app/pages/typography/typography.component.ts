import { Component, Input, OnInit } from "@angular/core";
import { Reponse } from "src/app/model/reponse";

@Component({
  selector: "app-typography",
  templateUrl: "typography.component.html",
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {

  reponseActuelle:Reponse ;

  constructor() {}

  ngOnInit() {
    
  }

  handleReponse(reponse:Reponse) {
    this.reponseActuelle = reponse;
    console.log(this.reponseActuelle);
    
  }
}
