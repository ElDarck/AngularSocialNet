import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

import { DialogAddEdit } from "../matDialog/dialog-add-edit.component";
import { User } from "../../models/user";
import { DataService } from "../../services/data.service";
import { DeleteUserComponent } from "../matDialog/delete-user.component";
import { NotificationService } from "../../services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "admin.component.html",
  styleUrls: ["admin.component.sass"]
})
export class AdminComponent implements OnInit {

  loading : boolean = false;
  users: User[] = [];
  accessToken: any;
  currentUser!: User;
  id!: any;
  isAdd!: boolean;
  searchText: any;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private dataService: DataService,
    private matDialog: MatDialog,
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) {
    this.dataService.user.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.accessToken = this.currentUser.accessToken;
    this.loading = true;
    this.getAll();
  }

  openDialog(id: any, isAdd:boolean) {
    const dialogRef = this.matDialog.open( DialogAddEdit,
      {
        width: '550px',
        data: { id: id, accessToken : this.accessToken, isAdd: isAdd },
        hasBackdrop: true,
      })

    dialogRef.afterClosed()
      .subscribe( (confirmed : boolean) => {
        if (confirmed) {
          this.notificationService.showInfo("All done well", "Data")
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
        },
        error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Error", "I can't get all users");
        })
    let that = this;
    setTimeout( function () {
      that.ngxSpinnerService.hide();
    },500);
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
          this.notificationService.showInfo("All is OK", "Data delete")
          this.getAll();
        }
      })
  }

}
