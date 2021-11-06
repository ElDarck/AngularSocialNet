import {Component, OnInit} from "@angular/core";
import { User } from "../models/user";

import { DataService } from "../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogBodyComponent} from "../matDialog/dialogBody.component";
import { first } from "rxjs/operators";

@Component({
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit{

  user!: User;
  accessToken: any;
  isAdd!: boolean;

  constructor(
    private dataService: DataService,
    private matDialog: MatDialog,
  ) {
    this.dataService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.accessToken = this.user.accessToken;
    this.user = this.user.user;
    console.log(this.user);
    this.getById(this.user.id)
  }

  getById(id: string) {
    this.dataService.getById(id)
      .pipe(first())
      .subscribe( res => {
        this.user = res;
      },
        error => { console.log(`some error: ${error}`)});
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
          console.log("success");
          this.dataService.user.subscribe(x => this.user = x);
        }
      })
  }

}
