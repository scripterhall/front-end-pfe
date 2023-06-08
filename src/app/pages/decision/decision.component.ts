import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePk } from 'src/app/model/keys/role-pk';
import { Role } from 'src/app/model/role';
import { MembreService } from 'src/app/service/membre.service';
import { RoleService } from 'src/app/service/role.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router,
              private roleService:RoleService,
              private membreService:MembreService){}

  idProjet:number;
  idMembre:number;
  token:string;
  idChef:number
  aujourdhui:Date=new Date();
  role:Role;
  dateExpirationToken:Date;
  ngOnInit(): void {
    this.idProjet = this.route.snapshot.params['idProjet'];
    this.idMembre = this.route.snapshot.params['idMembre'];
    this.token = this.route.snapshot.params['token'];

    const decodedToken:any = jwt_decode(this.token);
    this.idChef = decodedToken.chefProjetId

    this.dateExpirationToken = new Date(decodedToken.exp *1000 )

    console.log(decodedToken);
    console.log("id : ",this.idChef);


    const rolePk:RolePk = {
      membreId: this.idMembre,
      projetId: this.idProjet,
    }




    this.roleService.afficherRole(rolePk).subscribe(
      data =>{
        console.log(data);
        this.role = data;
      }
    )
  }

  accepter(){
    this.role.status = "ACCEPTE"
    this.roleService.modifierRole(this.role).subscribe(
      data =>{
        console.log(data);

        this.membreService.getMembreById(this.idMembre).subscribe(
          data =>{
            localStorage.setItem('membre',JSON.stringify(data))
            Swal.fire(
              'Salut !',
              'Vous avez accepté l\'invitaion ',
              'success'
            ).then(
              result => {
                this.router.navigateByUrl('/inscription')
              }
            )

          }
        )
      }
    )
  }

  refuser(){
    Swal.fire({
      title: "Vous êtes sûr de refuser l'invitation",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
      background:'rgba(0,0,0,0.9)',
      backdrop: 'rgba(0,0,0,0.4)',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      focusConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.membreService.supprimerMembre(this.idMembre).subscribe(
          data =>console.log(data) )
          this.roleService.supprimerRole(this.role.pk,this.idChef).subscribe(
            data =>{
              Swal.fire(
                'Refus',
                'Vous avez rejeté l offre',
                'warning'
              ).then(
                result => {
                  if (result.isConfirmed)
                  window.location.href = 'https://www.numeryx.fr/fr/numeryx-technologies-inaugure-filiale-tunisie'
                }
              )
            }
          )
      }
    });


  }

}
