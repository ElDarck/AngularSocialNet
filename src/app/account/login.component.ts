import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import { DataService } from "../services/data.service";
import { first } from "rxjs/operators";

@Component({
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  returnUrl!: this;
  submitted: boolean = false;
  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private dataService: DataService,
  ) {}

  ngOnInit () {
    this.form = this.formBuilder.group({
      username: [' ', Validators.required],
      password: [' ', Validators.required]
    });

    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return
    }

    this.loading = true;
    this.dataService.login(this.f.username.value, this.f.password.value).pipe(first())
      .subscribe(data => {this.router.navigate([this.returnUrl])
        },
        error => {
        this.loading = false;
        })
  }

  get f() {
    return this.form.controls
  }

}
