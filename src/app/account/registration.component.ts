import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { DataService } from "../services/data.service";


@Component({
  templateUrl: "registration.component.html"
})
export class RegistrationComponent implements OnInit{

  form!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private dataService: DataService,
  ) {
  }

  ngOnInit () {
    this.form = this.formBuilder.group({
      firstname: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required, Validators.minLength(4)]
    })
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return
    }

    this.loading = true;
    this.dataService.register(this.form.value).pipe(first())
      .subscribe(
        data => {this.router.navigate(['../login']), {relativeTo: this.route}
        },
        error => {
          this.loading = false
        }
      )
  }

}
