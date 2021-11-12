import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

import { DialogAddEdit } from "../matDialog/dialog-add-edit.component";
import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "../models/role";
import { DeleteUserComponent } from "../matDialog/delete-user.component";
import { NotificationService } from "../services/notification.service";
import { UserInfoComponent } from "../matDialog/user-info.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  templateUrl: "userlist.component.html",
  styleUrls: ["userlist.component.sass"]
})
export class UserlistComponent implements OnInit {

  currentUser!: User;
  users : User[] = [];
  isAdmin: Role = Role.Admin;
  isUser: Role = Role.User;
  accessToken: any;
  searchText: any;
  isAdd!: boolean;
  isOnline!:boolean;
  user!: any;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.dataService.user.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.accessToken = this.currentUser.accessToken;
    this.getAll()
  }

  openInfo(user: any) {
    const dialogRef = this.matDialog.open( UserInfoComponent,
      {
        width: "400px",
        data: { user: user, accessToken: this.accessToken },
        hasBackdrop: true,
      })
    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.notificationService.showInfo("Close", "User")
          this.getAll();
        }
      })
  }
  deleteUser(id : string) {
    const dialogRef = this.matDialog.open( DeleteUserComponent,
      {
        width: "400px",
        data: { id: id, accessToken: this.accessToken },
        hasBackdrop: true,
      })
    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.notificationService.showWarning("User Delete", "Delete")
          this.getAll();
        }
      })
  }

  openDialog(id: string, isAdd: boolean) {
    const dialogRef = this.matDialog.open( DialogAddEdit,
      {
        width: '550px',
        data: { id: id, accessToken : this.accessToken, isAdd: isAdd },
        hasBackdrop: true,
      })

    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.notificationService.showInfo("All done", "Data")
          this.getAll();
        }
      })
  }

  getAll() {
    this.ngxSpinnerService.show();
    this.dataService.getAll()
      .pipe(first())
      .subscribe( data => {
        this.users = data;
        console.log(this.users)
      },
        error => {
        this.ngxSpinnerService.hide();
        this.notificationService.showError(`There is an ${error}`, "Error")
      })
    let that = this;
    setTimeout( function () {
      that.ngxSpinnerService.hide();
    },200);
  }

}
