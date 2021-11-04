import {Component, OnInit} from "@angular/core";
import { User } from "../models/user";

import { DataService } from "../services/data.service";

@Component({
  templateUrl: "list.component.html"
})
export class ListComponent implements OnInit{

  user!: User;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.user = this.dataService.userValue;
  }

}
