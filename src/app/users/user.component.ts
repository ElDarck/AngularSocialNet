import {Component, OnInit} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { DialogAddEdit } from "../matDialog/dialog-add-edit.component";
import {NotificationService} from "../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  templateUrl: "user.component.html",
  styleUrls: ["user.component.sass"]
})
export class UserComponent implements OnInit{

  user!: User;
  accessToken: any;
  isAdd!: boolean;

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private dataService: DataService,
    private matDialog: MatDialog,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.dataService.user.subscribe(x => this.user = x);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.accessToken = this.user.accessToken;
    this.user = this.user.user;
    this.getById(this.user.id)
  }

  getById(id: string) {
    this.ngxSpinnerService.show();

    this.dataService.getById(id)
      .pipe(first())
      .subscribe( res => {
        this.user = res;
      },
        error => {
          this.ngxSpinnerService.hide();
        this.notificationService.showError("Error", "Something wrong")
      });
    this.ngxSpinnerService.hide();
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
          this.dataService.user.subscribe(x => this.user = x);
        }
      })
  }

}
