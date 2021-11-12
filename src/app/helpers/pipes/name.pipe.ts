import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'shortname'
})
export class NamePipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      let str = value[0]+'.';
      return str.toUpperCase();
    } else {
      return " "
    }

  }

}
