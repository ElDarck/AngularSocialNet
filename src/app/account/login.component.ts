import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";

import { DataService } from "../services/data.service";
import { first } from "rxjs/operators";

@Component({
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  returnUrl!: this;
  submitted: boolean = false;
  loading: boolean = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private dataService: DataService,
  ) {
    if (this.dataService.userValue) {
      this.router.navigate(['/user']);
    }
  }

  ngOnInit () {
    this.form = this.formBuilder.group({
      email: [' ', [Validators.required]],
      password: [' ', [Validators.required, Validators.minLength(5)]]
    });

    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return console.log("There is an error...")
    }

    this.loading = true;
    console.log(this.f.email.value, this.f.password.value);
    this.dataService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {this.router.navigate(['/user/'])
          console.log(data)
        },
        error => {
          this.error = error
          this.loading = false;
        })
  }

  get f() {
    return this.form.controls
  }

}
