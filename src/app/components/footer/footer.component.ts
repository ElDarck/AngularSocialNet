import { Component } from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "footer-component",
  templateUrl: "footer.component.html",
  styleUrls: ["footer.component.sass"]
})
export class FooterComponent {

  constructor(private translate: TranslateService,) {
    translate.setDefaultLang('en');
  }


}
