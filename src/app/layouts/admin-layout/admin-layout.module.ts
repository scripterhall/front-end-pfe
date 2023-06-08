import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import {DragDropModule} from '@angular/cdk/drag-drop';
import { animation } from "@angular/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { FireworksComponent } from '../../pages/fireworks/fireworks.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CourbesComponent } from "src/app/pages/courbes/courbes.component";
import { HistoireMembreChartComponent } from '../../pages/histoire-membre-chart/histoire-membre-chart.component';
import { StatCourbComponent } from "src/app/pages/dialogs/stat-courb/stat-courb.component";
import { ListMembreProjetComponent } from "src/app/pages/list-membre-projet/list-membre-projet.component";

import { InputChatComponent } from '../../pages/chatContenu/input-chat/input-chat.component';
import { ContenaireMessageComponent } from '../../pages/chatContenu/contenaire-message/contenaire-message.component';
//import { CalendarModule } from 'angular-calendar';
import 'dhtmlx-gantt';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CorbeilleComponent } from '../../pages/corbeille/corbeille.component';


@NgModule({
  imports: [
    //CalendarModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    NgbModule,
    MatToolbarModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    FireworksComponent,
    TablesComponent,
    IconsComponent,
    CorbeilleComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    CourbesComponent,
    HistoireMembreChartComponent,
    StatCourbComponent,
    ListMembreProjetComponent,
    InputChatComponent,
    ContenaireMessageComponent
  ]
})


export class AdminLayoutModule {}
