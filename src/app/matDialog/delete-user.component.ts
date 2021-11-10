import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import { DataService } from "../services/data.service";
import { NotificationService } from "../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  templateUrl: "delete-user.component.html"
})
export class DeleteUserComponent implements OnInit {

  userId!: string;
  accessToken! : any;

  constructor(
    @Inject( MAT_DIALOG_DATA ) public data?: any,
    // @ts-ignore
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    private dataService: DataService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
    translate.setDefaultLang('en');
    if (data) { this.userId = data.id; this.accessToken = data.accessToken}
  }

  ngOnInit() {
  }

  delete(id: any) {
    this.ngxSpinnerService.show();

    this.dataService.delete(id, this.accessToken)
      .pipe(first())
      .subscribe( data => {
        this.notificationService.showWarning("Delete is done", "Delete user")
      },
      error => {
        this.ngxSpinnerService.hide();
        this.notificationService.showError("There is an error", "Error")
      });
    this.dialogRef.close(true);
    let that = this;
    setTimeout( function () {
      that.ngxSpinnerService.hide();
    },500);
  }

  close() {
    this.dialogRef.close(false);
  }
}
