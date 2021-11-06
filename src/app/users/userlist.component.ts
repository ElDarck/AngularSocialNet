import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBodyComponent } from "../matDialog/dialogBody.component";

import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "../models/role";
import {DeleteUserComponent} from "../matDialog/delete-user.component";

@Component({
  templateUrl: "userlist.component.html"
})
export class UserlistComponent implements OnInit {

  currentUser!: User;
  users : User[] = [];
  isAdmin: Role = Role.Admin;
  isUser: Role = Role.User;
  accessToken: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.dataService.user.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.accessToken = this.currentUser.accessToken;
    this.getAll()
  }

  deleteUser(id : string) {
    console.log(id);
    const dialogRef = this.matDialog.open( DeleteUserComponent,
      {
        width: "400px",
        data: { id: id, accessToken: this.accessToken },
        hasBackdrop: true,
      })
    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.getAll();
        }
      })
  }

  openDialog(id: string) {
    console.log(id);
    const dialogRef = this.matDialog.open( DialogBodyComponent,
      {
        width: '550px',
        data: { id: id, accessToken : this.accessToken },
        hasBackdrop: true,
      })

    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.getAll();
        }
      })
  }

  getAll() {
    console.log("Getting all");
    this.dataService.getAll()
      .pipe(first())
      .subscribe( data => {
        this.users = data;
        console.log(data);
      },
        error => {
        console.log(error);
      })
  }

}
