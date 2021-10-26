import { Component } from "@angular/core";
import { User } from "src/app/models/user";
import { DataService } from "../../services/data.service";

@Component({
  selector: "header-component",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.sass"]
})
export class HeaderComponent {

  user!: User;
  avatarMenu: boolean = true;
  langMenu: boolean = true;

  constructor(
    private dataService : DataService
  ) {
    this.dataService.user.subscribe(x => this.user = x);
    }

  logout() {
    this.dataService.logout();
  }

  hideAvatarMenu() {
    this.avatarMenu = this.avatarMenu === true ? false : true;
  }
  hideLangMenu() {
    this.langMenu = this.langMenu === true ? false : true;
  }
}
