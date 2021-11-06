import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { DialogBodyComponent } from "../matDialog/dialogBody.component";
import { MatDialog } from "@angular/material/dialog";

import { User } from "../models/user";
import { DataService } from "../services/data.service";
import {DeleteUserComponent} from "../matDialog/delete-user.component";

@Component({
  templateUrl: "admin.component.html"
})
export class AdminComponent implements OnInit {

  loading : boolean = false;
  users: User[] = [];
  accessToken: any;
  currentUser!: User;
  id!: any;
  isAdd!: boolean;

  constructor(
    private dataService: DataService,
    private matDialog: MatDialog,
  ) {
    this.dataService.user.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.accessToken = this.currentUser.accessToken;
    this.loading = true;
    this.getAll();
  }

  openDialog(id: any, isAdd:boolean) {
    console.log(id);
    const dialogRef = this.matDialog.open( DialogBodyComponent,
      {
        width: '550px',
        data: { id: id, accessToken : this.accessToken, isAdd: isAdd },
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

}
