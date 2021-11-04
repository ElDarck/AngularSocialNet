import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormBuilder,FormGroup } from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import { first } from "rxjs/operators";

import { User } from "../models/user";
import { DataService } from "../services/data.service";

@Component({
  templateUrl: "edit.component.html"
})
export class EditComponent implements OnInit{

  user!: User;
  form!: FormGroup;
  id!: string;
  loading:boolean = false;
  submitted: boolean = false;
  isAddMode!: boolean;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.user = this.dataService.userValue
    console.log(this.user);
    this.id = this.user.id;

    this.isAddMode =!this.id;

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.min(3)]],
      firstName: ['', [Validators.required, Validators.min(3)]],
      lastName: ['', [Validators.required, Validators.min(3)]],
      birthDate: ['', [ Validators.min(1)]],
      address: ['', [Validators.min(5)]],
      phoneNumber: ['', [Validators.required, Validators.min(10)]],
      studyFirst: ['', [Validators.min(5)]],
      studySecond: ['', [Validators.min(5)]],
      studyThird: ['', [Validators.min(5)]],
    })

    if (!this.isAddMode) {
      this.dataService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.f.username.setValue(x.username);
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.birthDate.setValue(x.birthDate);
          this.f.address.setValue(x.address);
          this.f.phoneNumber.setValue(x.phoneNumber);
          this.f.studyFirst.setValue(x.studyFirst);
          this.f.studySecond.setValue(x.studySecond);
          this.f.studyThird.setValue(x.studyThird);
        });
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return console.log("There is an error...");
    }
    console.log(this.user.id);
    this.loading = true;

    if (this.isAddMode) {
      this.createUser();
      console.log("create");
    } else {
      this.updateUser();
      console.log("update")
    }
  }

  private createUser() {
    this.dataService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/users/'], { relativeTo: this.route });
        },
        error => {
          this.loading = false;
        });
  }

  private updateUser() {
    this.dataService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {this.router.navigate(['/users/'], { relativeTo: this.route });},
        error => {this.loading = false}
      )
  }
}
