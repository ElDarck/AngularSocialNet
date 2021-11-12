import { Injectable } from "@angular/core";
import {FormGroup, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class AgeValidator {

  someAge (): ValidatorFn {
    // @ts-ignore
    return (formGroup: FormGroup) => {

      const age = formGroup.get('birthDate')?.value;
      let date = new Date();
      const currentDate = date.getFullYear().toString() +'-'+ (date.getMonth()+1).toString()
        + '-'+date.getDate().toString()

      if (!age) {
        // @ts-ignore
        return null
      }

      if (currentDate > age) {
        // @ts-ignore
        return null
      }

      if (currentDate < age) {
        // @ts-ignore
        return {age: true}
      }

      // @ts-ignore
      return null
    }
  }

}
