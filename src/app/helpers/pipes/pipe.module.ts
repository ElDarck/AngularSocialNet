import { NgModule } from "@angular/core";

import { NamePipe } from "./name.pipe";

@NgModule({
  imports: [],
  declarations: [
    NamePipe
  ],
  exports: [
    NamePipe
  ]
})
export class PipeModule {}
