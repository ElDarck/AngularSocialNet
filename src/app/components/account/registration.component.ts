import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { DataService } from "../../services/data.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  templateUrl: "registration.component.html"
})
export class RegistrationComponent implements OnInit{

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private route : ActivatedRoute,
    private dataService: DataService,
    private translate: TranslateService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit () {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      role: ["", [Validators.required]]
    })
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return this.notificationService.showError("Error", "Registration")
    }

    this.ngxSpinnerService.show();

    this.dataService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationService.showSuccess("All done well", "Registration")
          this.router.navigate(['../login'], {relativeTo: this.route}
          )},
        error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Error", "Registration")
        }
      )
    let that = this;
    setTimeout( function() {
      that.ngxSpinnerService.hide()
    }, 1000)
  }

}
