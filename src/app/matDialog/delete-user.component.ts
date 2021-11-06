import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { first } from "rxjs/operators";

import { DataService } from "../services/data.service";

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
  ) {
    if (data) { this.userId = data.id; this.accessToken = data.accessToken}
  }

  ngOnInit() {
  }

  delete(id: any) {
    this.dataService.delete(id, this.accessToken)
      .pipe(first())
      .subscribe( data => {
        console.log("delete")
      },
      error => console.log(`some error: ${error}`))
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
