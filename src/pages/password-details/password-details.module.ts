import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordDetailsPage } from './password-details';

@NgModule({
  declarations: [
    PasswordDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordDetailsPage),
  ],
  exports: [
    PasswordDetailsPage
  ]
})
export class PasswordDetailsPageModule {}
