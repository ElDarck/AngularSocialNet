import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

import { DataService } from "../../services/data.service";
import { User } from "../../models/user";
import { NotificationService } from "../../services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "user-info.component.html",
  styleUrls: ["user-info.component.sass"]
})
export class UserInfoComponent implements  OnInit {

  image?: any;
  user! : User;
  accessToken!: any;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    @Inject( MAT_DIALOG_DATA ) public data?: any,
    // @ts-ignore
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    private dataService: DataService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    translate.setDefaultLang('en');
    if (data) { this.user = data.user; this.accessToken = data.accessToken}
  }

  ngOnInit() {
    this.image = this.user.img
    console.log(this.image)
  }

  close() {
    this.ngxSpinnerService.show();
    this.dialogRef.close(false);
    this.ngxSpinnerService.hide();
  }

}
