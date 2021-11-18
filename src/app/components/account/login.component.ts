import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import { first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../services/notification.service";

import { DataService } from "../../services/data.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  returnUrl!: this;
  submitted: boolean = false;
  error = "";

  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private route : ActivatedRoute,
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    if (this.dataService.userValue) {
      this.router.navigate(['/user']);
    }
  }

  ngOnInit () {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return this.notificationService.showError("Error", "Login")
    }

    this.ngxSpinnerService.show();

    this.dataService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(data =>
        {
          this.notificationService.showSuccess("Ok", "Login")
          this.router.navigate(['/user/'])
        },
        error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Error", "Login")
          this.error = error
        })
    let that = this;
    setTimeout( function () {
      that.ngxSpinnerService.hide();
    },200);


  }

  get f() {
    return this.form.controls
  }

}
