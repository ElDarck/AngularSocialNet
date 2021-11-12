import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class DateValidator {

  public twoDatesFirst (): ValidatorFn {
    // @ts-ignore
    return ( formGroup: FormGroup) => {
      const firstDateFrom = formGroup.get('studyFirstDateFrom')?.value;
      const firstDateTo = formGroup.get('studyFirstDateTo')?.value;

      if( !firstDateFrom && !firstDateTo) {
        return null
      }

      // @ts-ignore
      if (firstDateFrom <= firstDateTo) {
        return null
      }
      // @ts-ignore
      if( firstDateFrom >= firstDateTo) {
        return { date1: true }
      }

      return null
    }
  }
  public twoDatesSecond (): ValidatorFn {
    // @ts-ignore
    return ( formGroup: FormGroup) => {
      const secondDateFrom = formGroup.get('studySecondDateFrom')?.value;
      const secondDateTo = formGroup.get('studySecondDateTo')?.value;

      if( !secondDateFrom && !secondDateTo) {
        return null
      }

      // @ts-ignore
      if (secondDateFrom <= secondDateTo) {
        return null
      }
      // @ts-ignore
      if( secondDateFrom >= secondDateTo) {
        return { date2: true }
      }

      return null
    }
  }
  public twoDatesThird (): ValidatorFn {
    // @ts-ignore
    return ( formGroup: FormGroup) => {
      const thirdDateFrom = formGroup.get('studyThirdDateFrom')?.value;
      const thirdDateTo = formGroup.get('studyThirdDateTo')?.value;

      if( !thirdDateFrom && !thirdDateTo) {
        return null
      }

      // @ts-ignore
      if (thirdDateFrom <= thirdDateTo) {
        return null
      }
      // @ts-ignore
      if( thirdDateFrom >= thirdDateTo) {
        return { date3: true }
      }

      return null
    }
  }
}
