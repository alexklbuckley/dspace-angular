import { NgModule } from '@angular/core';

import { CollectionFormComponent } from './collection-form.component';
import { CollectionStylesFormComponent } from './collection-form.styles';
import { SharedModule } from '../../shared/shared.module';
import { ComcolModule } from '../../shared/comcol/comcol.module';
import { FormModule } from '../../shared/form/form.module';

@NgModule({
  imports: [
    ComcolModule,
    FormModule,
    SharedModule
  ],
  declarations: [
    CollectionFormComponent,
    CollectionStylesFormComponent,
  ],
  exports: [
    CollectionFormComponent,
    CollectionStylesFormComponent,
  ]
})
export class CollectionFormModule {

}
