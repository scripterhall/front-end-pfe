import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from '../select-projet/email-exists.validator';
import { InvitationService } from 'src/app/service/invitation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mot-de-pass-oublier',
  templateUrl: './mot-de-pass-oublier.component.html',
  styleUrls: ['./mot-de-pass-oublier.component.scss']
})
export class MotDePassOublierComponent implements OnInit {

  emailForm: FormGroup;
  constructor(private router:Router,private formBuilder:FormBuilder,private invitationService:InvitationService){
    
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email:["",[Validators.required,emailValidator]]
    })
  }

  submitForm(){
    this.invitationService.resetMotDePass(this.emailForm.get('email').value).subscribe(
      data => {
        console.log(data);
        
        Swal.fire(
          'Succés',
          'vérifier votre email vous trouverez votre nouveau mot de pass' ,
          'success'
        )
        this.router.navigateByUrl("/auth")
      },
      error =>{
        if(error.status == 404)
        Swal.fire(
          'Erreur',
          'vous n\'avez même pas un compte',
          'error'
        )
        else if(error.status == 500)
        Swal.fire(
          'Erreur',
          'vous ne pouvez pas reinitialiser votre mot de passe pour le moment',
          'error'
        )
        else{
        console.log(error);
        
        Swal.fire(
          'Erreur',
          'verifie votre email',
          'error'
        )
        }
      }
    )
    
    
  }

}
