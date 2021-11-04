import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "../models/user";
import { DataService } from "../services/data.service";

@Component({
  templateUrl: "admin.component.html"
})
export class AdminComponent implements OnInit {

  loading : boolean = false;
  users: User[] = []

  constructor(
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.loading = true;
    this.dataService.getAll()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });
  }

}
