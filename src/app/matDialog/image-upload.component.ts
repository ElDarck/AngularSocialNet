import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../services/data.service";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../services/notification.service";
import {observable, Observable, Subscribable, Subscriber} from "rxjs";
import { first } from 'rxjs/operators';
import {R} from "@angular/cdk/keycodes";
import {decode} from "base64-arraybuffer";

@Component({
  selector: 'mage-upload-component',
  templateUrl: 'image-upload-component.html',
})
export class PhotoBase64Component implements OnInit {

  imageUrl!: any;
  accessToken!: any;
  userId!: string;

  @ViewChild('file') file!: ElementRef;

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data?: any,
    // @ts-ignore
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    private dataService: DataService,
    private ngxSpinnerService: NgxSpinnerService,
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) {
    if (data) {
      this.userId = data.id;
      this.accessToken = data.accessToken
    }
  }

  ngOnInit() {
  }

  onChange($event: Event) {
    // @ts-ignore
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subs: Subscriber<any>) => {
      this.readFile(file, subs);
    })
    observable.subscribe(d => {
      this.imageUrl = d;
    })
  }

  readFile(file: File, subs: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subs.next(fileReader.result);
      subs.complete();
    };
    fileReader.onerror = (error) => {
      subs.error(error);
      subs.complete();
    }
  }

  sendImg() {
      this.ngxSpinnerService.show();
      this.dataService.update(this.userId, {img: this.imageUrl}, this.accessToken)
        .pipe(first())
        .subscribe(data => {
          this.notificationService.showSuccess("Image send", "Update done")
        }, error => {
          this.ngxSpinnerService.hide();
          this.notificationService.showError("Some error", "Error");
        })
      this.ngxSpinnerService.hide();
      this.dialogRef.close(true);
    }

  close() {
      this.dialogRef.close(false);
      this.notificationService.showError("Close dialog", "Close");
    }

}
