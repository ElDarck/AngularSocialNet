import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { DataService } from "../services/data.service";

@Component({templateUrl: "layout.component.html"})
export class LayoutComponent {
  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    if (this.dataService.userValue) {
      this.router.navigate(["/"]);
    }
  }

}
