import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  CdkDrag, CdkDropList,DragDropModule } from '@angular/cdk/drag-drop';
import { SelectProjetComponent } from './pages/select-projet/select-projet.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SprintDialogPanelComponent } from './pages/dialogs/sprint-dialog-panel/sprint-dialog-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AjouterTicketHistoireFormComponent } from './pages/ajouter-ticket-histoire-form/ajouter-ticket-histoire-form.component';
import { AjouterSprintFormComponent } from './pages/ajouter-sprint-form/ajouter-sprint-form.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ConfirmDialogDeleteUserStoryComponent } from './pages/confirm-dialog-delete-user-story/confirm-dialog-delete-user-story.component';
import { ConfirmAddUserStoryDialogueComponent } from './pages/confirm-add-user-story-dialogue/confirm-add-user-story-dialogue.component';
import { MatListModule } from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import { AjoutTacheSpbComponent } from './pages/dialogs/ajout-tache-spb/ajout-tache-spb.component';
import { UpdateUserStoryDialogComponent } from './pages/update-user-story-dialog/update-user-story-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrumBoardComponent } from './pages/scrum-board/scrum-board.component';
import { GestionTacheDialogComponent } from './pages/dialogs/gestion-tache-dialog/gestion-tache-dialog.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DecisionComponent } from './pages/decision/decision.component';
import { InvitationComponent } from './pages/dialogs/invitation/invitation.component';
import { StatCourbComponent } from './pages/dialogs/stat-courb/stat-courb.component';
import { ListMembreProjetComponent } from './pages/list-membre-projet/list-membre-projet.component';
import { PerformanceCourbeComponent } from './pages/dialogs/performance-courbe/performance-courbe.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { WebcamModule } from 'ngx-webcam';
import { AuthentificationComponent } from './auth/authentification/authentification.component';
import { SearchPanelComponent } from './pages/dialogs/search-panel/search-panel.component';
import { ConsuletMembrePanelComponent } from './pages/dialogs/consulet-membre-panel/consulet-membre-panel.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProjetKeyComponent } from './pages/dialogs/projet-key/projet-key.component';
import { ModifierProfileComponent } from './pages/modifier-profile/modifier-profile.component';
import { SelectProjetMembreComponent } from './pages/select-projet-membre/select-projet-membre.component';
// import { CalendarModule } from 'angular-calendar';
import { ChooseTypeDialogComponent } from './pages/dialogs/choose-type-dialog/choose-type-dialog.component'; // Import du module CalendarModule
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { CsrfInterceptor } from "./interceptors/csrf.interceptor";
import { MotDePassOublierComponent } from './pages/mot-de-pass-oublier/mot-de-pass-oublier.component';
import { ChartParcoursComponent } from './pages/dialogs/chart-parcours/chart-parcours.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatToolbarModule,
    WebcamModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    ComponentsModule,
    MatNativeDateModule ,
    MatRadioModule,
    NgbModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    // CalendarModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, SelectProjetComponent,
    SprintDialogPanelComponent, AjouterTicketHistoireFormComponent, AjouterSprintFormComponent,
    AjoutTacheSpbComponent, GestionTacheDialogComponent, ConfirmDialogComponent,
    ConfirmDialogDeleteUserStoryComponent, ConfirmAddUserStoryDialogueComponent,
    UpdateUserStoryDialogComponent,
    ScrumBoardComponent,
    DecisionComponent,
    InvitationComponent, PerformanceCourbeComponent, InscriptionComponent, AuthentificationComponent, SearchPanelComponent, ConsuletMembrePanelComponent, ProjetKeyComponent, ModifierProfileComponent, SelectProjetMembreComponent, ChooseTypeDialogComponent, MotDePassOublierComponent, ChartParcoursComponent
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
