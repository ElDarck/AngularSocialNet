import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import { DataService } from "../services/data.service";
import { User } from "../models/user";
import { NotificationService } from "../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: "dialog-box",
  templateUrl: "dialog-add-edit.component.ts.html"
})
export class DialogAddEdit implements OnInit{

  formUser! : FormGroup;
  f1!: boolean;
  formEducation!: FormGroup;
  f2!: boolean;
  submitted!: boolean;
  loading!: boolean;
  user!: User;
  id!: string;
  userId!: string;
  accessToken!: any;
  isAdd!: boolean;

  constructor(
    @Inject( MAT_DIALOG_DATA ) public data?: any,
    // @ts-ignore
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    private dataService: DataService,
    private ngxSpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    translate.setDefaultLang('en');
    if (data) { this.userId = data.id; this.accessToken = data.accessToken; this.isAdd = data.isAdd}
    this.getById()
  }

  getById(){
    if(!this.isAdd) {
      this.notificationService.showInfo("Edit mode", "Mode")
      this.dataService.getById(this.userId)
        .pipe(first())
        .subscribe(x => {
          this.f.username.setValue(x.username);
          this.f.email.setValue(x.email);
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.phoneNumber.setValue(x.phoneNumber);
          this.f.role.setValue(x.role);
          this.e.birthDate.setValue(x.birthDate);
          this.e.address.setValue(x.address);
          this.e.school.setValue(x.school);
          this.e.universityFirst.setValue(x.universityFirst);
          this.e.facultyFirst.setValue(x.facultyFirst);
          this.e.courseFirst.setValue(x.courseFirst);
          this.e.studyFirstDateFrom.setValue(x.studyFirstDateFrom);
          this.e.studyFirstDateTo.setValue(x.studyFirstDateTo);
          this.e.universitySecond.setValue(x.universitySecond);
          this.e.facultySecond.setValue(x.facultySecond);
          this.e.courseSecond.setValue(x.courseSecond);
          this.e.studySecondDateFrom.setValue(x.studySecondDateFrom);
          this.e.studySecondDateTo.setValue(x.studySecondDateTo);
          this.e.universityThird.setValue(x.universityThird);
          this.e.facultyThird.setValue(x.facultyThird);
          this.e.courseThird.setValue(x.courseThird);
          this.e.studyThirdDateFrom.setValue(x.studyThirdDateFrom);
          this.e.studyThirdDateTo.setValue(x.studyThirdDateTo);
        });
    } else {this.notificationService.showInfo("Adding mode", "Mode")}
  }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
      username: ["", [Validators.required, Validators.min(3)]],
      email: ["", [Validators.required]],
      role: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.min(5)]],
      firstName: ["", [Validators.required, Validators.min(3)]],
      lastName: ["", [Validators.required, Validators.min(3)]],
      phoneNumber: ["", [Validators.required, Validators.min(10)]],
    })
    if (!this.isAdd){
      this.formEducation = this.formBuilder.group({
        birthDate: ["", [ Validators.min(1)]],
        address: ["", [Validators.min(5)]],
        school: ["", [Validators.min(10)]],
        universityFirst: ["", [Validators.min(10)]],
        facultyFirst: ["", [Validators.min(10)]],
        courseFirst: ["", [Validators.min(10)]],
        studyFirstDateFrom: ["", [Validators.min(5)]],
        studyFirstDateTo: ["", [Validators.min(5)]],
        universitySecond: ["", [Validators.min(10)]],
        facultySecond: ["", [Validators.min(10)]],
        courseSecond: ["", [Validators.min(10)]],
        studySecondDateFrom: ["", [Validators.min(5)]],
        studySecondDateTo: ["", [Validators.min(5)]],
        universityThird: ["", [Validators.min(10)]],
        facultyThird: ["", [Validators.min(10)]],
        courseThird: ["", [Validators.min(10)]],
        studyThirdDateFrom: ["", [Validators.min(5)]],
        studyThirdDateTo: ["", [Validators.min(5)]],
      })
    }
  }

  get f() { return this.formUser.controls; }
  get e() { return this.formEducation.controls; }

  close() {
    this.dialogRef.close(false);
  }

  onSubmit( data: any, f1: boolean, f2: boolean ) {
    this.submitted = true;

    if (this.formEducation.invalid && f2 || this.formUser.invalid && f1) {
      return this.notificationService.showError("Some error", "Error??");
    }

    this.ngxSpinnerService.show();

    if(!this.isAdd) {
      this.updateUser(data);

    } else {
        this.createNew();
    }


  }

  private updateUser( data: any ) {
    this.dataService.update(this.userId, data, this.accessToken)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationService.showSuccess("User info update", "Update done")
        },
        error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Some error", "Error");
          this.loading = false
        }
      )
    this.ngxSpinnerService.hide();
    this.dialogRef.close(true);
  }

  private createNew() {
    this.dataService.register(this.formUser.value)
      .pipe(first())
      .subscribe(
        data => { this.notificationService.showSuccess("New user create", "Create done") },
        error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Some error", "Error");
        }
      );
    this.ngxSpinnerService.hide();
    this.dialogRef.close(true);
  }
}
