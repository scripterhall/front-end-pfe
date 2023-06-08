import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ChefProjet } from 'src/app/model/chef-projet';
import { Membre } from 'src/app/model/membre';
import { ChefProjetServiceService } from 'src/app/service/chef-projet-service.service';
import { MembreService } from 'src/app/service/membre.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  personneFormGroup:FormGroup
  chefProjetFormGroup:FormGroup
  membreFormGroup:FormGroup
  membre:Membre

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private membreService: MembreService,
              private chefProjetService: ChefProjetServiceService) {}
  type = new FormControl('',[Validators.required]);
  ngOnInit(): void {
    if(localStorage.getItem("membre"))
      this.membre  = JSON.parse(localStorage.getItem("membre"))

    this.personneFormGroup = this.formBuilder.group({
      nom:["",Validators.required], 
      prenom:["",Validators.required],
      username:["",Validators.required],
      email:["",[Validators.required, Validators.email]], 
      adresse:["",Validators.required], 
      telephone:["",[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],// 8 chiffre
      pwd:["",Validators.required] ,
      dateInscription:new Date(),
   });

   this.chefProjetFormGroup = this.formBuilder.group({
    competanceAnalyseDonnees:[false],
    competanceDeGestion:[false],
    photo:[null]
   })

   this.membreFormGroup = this.formBuilder.group({
     status:"ACTIF"
   })


   this.type.valueChanges.subscribe(
    type => {
      if( type == 'membre' && localStorage.getItem('membre')){
        const membre = JSON.parse(localStorage.getItem('membre'))
        this.personneFormGroup.patchValue({email:membre.email})
      }
    }
   )
   
  }

 public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
   
     // Convert sysImage to bytes
    const base64 = this.sysImage.split(',')[1];
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }  
    // Assign byteArray to photo field in chefProjetFormGroup
    this.chefProjetFormGroup.patchValue({
      photo: byteArray
    });
    
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  inscriptionMembre(){
    const membre:Membre = {
      ...this.personneFormGroup.value,
      ...this.membreFormGroup.value
    }

    if(localStorage.getItem('membre')){
      const id = JSON.parse(localStorage.getItem('membre')).id
      membre.id = id ;
      this.enregistrerMembre(membre)
    }else{
      this.enregistrerMembre(membre)
    }
  }


  enregistrerMembre(membre:Membre){
    this.membreService.inscription(membre).subscribe(
      data => {
          Swal.fire(
            'Merci !',
            'l\'inscription est realiser avec succes',
            'success'
          ).then(
            result=>{
              this.router.navigateByUrl('/auth')
            }
          )
      },
      error =>{
        if(error.status ==400)
        Swal.fire(
          'erreur',
          'vous avez déjà un compte chef projet',
          'error'
        )
      }
      

      )
  }


  inscriptionChefProjet(){
    const chefProjet:ChefProjet = {
      ...this.chefProjetFormGroup.value,
      ...this.personneFormGroup.value
    }
    if(chefProjet.photo){
    const byteArray = new Array(chefProjet.photo.length);
    for (let i = 0; i < chefProjet.photo.length; i++) {
      byteArray[i] = chefProjet.photo[i];
    }
    chefProjet.photo = byteArray;
   }
    console.log(chefProjet);
    this.chefProjetService.inscription(chefProjet).subscribe(
      data =>{
        if(!data)
          Swal.fire(
            'Attention !',
            'erreur d\'inscription',
            'error'
          )
        console.log(data);
        Swal.fire(
          'Merci !',
          'l\'inscription est realiser avec succes',
          'success'
        ).then(
          result=>{
            this.router.navigateByUrl('/auth')
          }
        )
      },
      error => {
        if(error.status ==400)
        Swal.fire(
          'erreur',
          'vous avez déjà un compte membre',
          'error'
        )
      }
    )
    
  }


}
