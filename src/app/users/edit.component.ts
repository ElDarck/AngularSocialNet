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
  userId!: string;
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
    this.user = this.dataService.userValue;

    this.id = this.user.id;
    this.userId = this.user.user.id;

    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(5)]],
      firstName: ['', [Validators.required, Validators.min(3)]],
      lastName: ['', [Validators.required, Validators.min(3)]],
      birthDate: ['', [ Validators.min(1)]],
      address: ['', [Validators.min(5)]],
      phoneNumber: ['', [Validators.required, Validators.min(10)]],
    })

    if (!this.isAddMode) {
      this.dataService.getById(this.userId)
        .pipe(first())
        .subscribe(x => {
          this.f.username.setValue(x.username);
          this.f.email.setValue(x.email);
          this.f.role.setValue(x.role);
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.birthDate.setValue(x.birthDate);
          this.f.address.setValue(x.address);
          this.f.phoneNumber.setValue(x.phoneNumber);
        });
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return console.log("There is an error...");
    }

    this.loading = true;

    this.updateUser();
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
    this.dataService.update(this.userId, this.form.value, this.user.accessToken)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/user/'], { relativeTo: this.route });
          alert("Update is complete")
        },
        error => {this.loading = false}
      )
  }
}

