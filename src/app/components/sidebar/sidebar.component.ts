import { Component, OnInit } from "@angular/core";
import { ChefProjet } from "src/app/model/chef-projet";
import { Membre } from "src/app/model/membre";
import { Projet } from "src/app/model/projet";
import { Role } from "src/app/model/role";
import { AuthentificationService } from "src/app/service/authentification.service";
import { ChefProjetServiceService } from "src/app/service/chef-projet-service.service";
import { MembreService } from "src/app/service/membre.service";
import { SprintService } from "src/app/service/sprint.service";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  disabled?:boolean,
  class: string,
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icone-chart-line",
    class: ""
  },
  {
    path: "/planification-projet",
    title: "Planification projet",
    rtlTitle: "مهام المنتج",
    icon: "icon-tablet-2",
    class: ""
  },
  {
    path: "/sprint-backlog",
    title: "sprint backlog",
    rtlTitle: "مهام سبرنت",
    icon: "icon-tie-bow",
    class: "" ,
  },


  {
    path: "/scrumBoard",
    title: "scrum board",
    rtlTitle: "لوحة السكروم",
    icon: "icon-video-66",
    class: ""
  },
  {
    path: "/dossiers",
    title: "liste des ressources",
    rtlTitle: "الموارد المشترك ",
    icon: "icone-folders",
    class: ""
  },
  {
    path: "/chat-bot",
    title: "Scrum teacher",
    rtlTitle: "طباعة",
    icon: "icone-comment-alt-smile",
    class: ""
  },
  {
    path: "/feuille-route",
    title: "Feuille de route",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/corbeille",
    title: "corbeille",
    rtlTitle: "ار تي ال",
    icon: "icon-trash-simple",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  projet:Projet;

  constructor(
    private sprintService: SprintService,
    private chefProjetService: ChefProjetServiceService,
    private authService:AuthentificationService
  ) {}

  sprintLancee:number;
  chefProjet:ChefProjet
  role:Role
  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.chefProjet = this.chefProjetService.getChefProjetFromToken()
      if(this.authService.getUserRolesToken(sessionStorage.getItem('token')).membre ){
        const roles= this.authService.getUserRolesToken(sessionStorage.getItem('token')).roles as Role[]
        this.role = roles.find(role => role.pk.projetId == JSON.parse(localStorage?.getItem('projet')).id)
      }
    }
    this.projet =JSON.parse(localStorage.getItem("projet"));
    this.sprintService.getListSprintsByProductBacklog(JSON.parse(localStorage.getItem('productBacklogCourant')).id)
    .subscribe(
      data => {
        this.sprintLancee = data.filter(sprint => sprint.etat == "en cours")?.length
        this.menuItems = ROUTES.map((menuItem) =>
        menuItem.path === "/sprint-backlog" 
          ? {
              ...menuItem,
              disabled: this.sprintLancee == 0,
            }
          : menuItem
      );
      this.menuItems = ROUTES.map((menuItem) =>
      menuItem.path === "/chat-bot"|| menuItem.path === "/corbeille" ||  menuItem.path === "/scrumBoard" 
        ? {
            ...menuItem,
            disabled:this.chefProjet || (menuItem.path === "/corbeille" && this.role?.type == 'po'),
          }
        : menuItem
    );
   
   
      }
    )
    
   this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
