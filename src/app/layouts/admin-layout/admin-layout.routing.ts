import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ScrumBoardComponent } from "src/app/pages/scrum-board/scrum-board.component";
import { CourbesComponent } from "src/app/pages/courbes/courbes.component";
import { CorbeilleComponent } from "src/app/pages/corbeille/corbeille.component";
import { ModifierProfileComponent } from "src/app/pages/modifier-profile/modifier-profile.component";
import { AuthGuard } from "src/app/service/auth.guard";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "planification-projet", component: IconsComponent, canActivate: [AuthGuard] },
  { path: "sprint-backlog", component: MapComponent, canActivate: [AuthGuard] },
  { path: "scrumBoard", component: ScrumBoardComponent, canActivate: [AuthGuard] },
  { path: "user", component: ModifierProfileComponent, canActivate: [AuthGuard] },
  {path:"visioConference",component:UserComponent, canActivate: [AuthGuard]},
  { path: "dossiers", component: TablesComponent, canActivate: [AuthGuard] },
  { path: "chat-bot", component: TypographyComponent, canActivate: [AuthGuard] },
  { path: "courbes", component: CourbesComponent, canActivate: [AuthGuard] },
  {path: "corbeille", component:CorbeilleComponent, canActivate: [AuthGuard]},
  { path: "feuille-route", component: CourbesComponent, canActivate: [AuthGuard] },

];
