import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Password } from '../../models/password';
import { PasswordService } from '../../providers/password-service';

/**
 * Generated class for the PasswordDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password-details',
  templateUrl: 'password-details.html',
})
export class PasswordDetailsPage {
  name:string;
  password:Password;

  constructor(public navCtrl: NavController, private navParams: NavParams, private passwordService: PasswordService) {
    this.name = navParams.get('name');
    passwordService.loadDetails(this.name).subscribe(password => {
      this.password = password;
      console.log(password);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordDetailsPage');
  }

}
