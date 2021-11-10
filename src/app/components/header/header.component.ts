import {Component} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { User } from "src/app/models/user";
import { DataService}  from "../../services/data.service";
import { Role } from "../../models/role";
import {NotificationService} from "../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: "header-component",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.sass"]
})
export class HeaderComponent {

  user!: User;
  avatarMenu: boolean = true;
  langMenu: boolean = true;
  isAdmin: Role = Role.Admin;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private dataService : DataService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.dataService.user.subscribe(x => this.user = x);
    translate.setDefaultLang('en');
    }

  logout() {
    this.ngxSpinnerService.show();
    this.notificationService.showInfo("Good by user", "Login out")
    this.dataService.logout();
    this.ngxSpinnerService.hide();
  }

  hideAvatarMenu() {
    this.avatarMenu = !this.avatarMenu;
  }
  hideLangMenu() {
    this.langMenu = !this.langMenu;
  }

  switchLanguage(language: string) {
    this.ngxSpinnerService.show();
    this.notificationService.showInfo(`Let's talk ${language}`, "Language change")
    this.translate.use(language);
    this.ngxSpinnerService.hide();
  }

}
