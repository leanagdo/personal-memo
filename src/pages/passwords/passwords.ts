import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PasswordService } from '../../providers/password-service';
import { Password } from '../../models/password';
import { PasswordResponse } from '../../models/passwordResponse';
import { PasswordDetailsPage } from '../password-details/password-details';

/**
 * Generated class for the PasswordsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passwords',
  templateUrl: 'passwords.html',
})
export class PasswordsPage {
  passwordResponse: PasswordResponse;
  passwords;
  groupedPasswords = []
  originalPasswords: Password[]
  lastUpdateDate: String
  pet: string = "PasswordAlpha";


  constructor(public navCtrl: NavController, public navParams: NavParams, public passwordService: PasswordService) {
    /*passwordService.load().subscribe(passwords => {
      this.passwords = passwords;
      this.originalPasswords = passwords;
      console.log(this.passwords);

    })*/
    passwordService.load().subscribe(passwordResponse => {
      this.passwordResponse = passwordResponse;
      this.passwords = passwordResponse.passwords;
      this.originalPasswords = passwordResponse.passwords;
      this.lastUpdateDate = passwordResponse.lastUpdate;
      console.log(this.lastUpdateDate);

      this.passwords.sort(this.sortByName);
      this.groupContacts(this.passwords);

    })
  }

  goToDetails(name: string) {
    console.log('Go to detail ' + name);
    this.navCtrl.push(PasswordDetailsPage, {name});
  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 1) {
      // Load cached users
      this.passwords = this.originalPasswords;
    } else {
      // Get the searched users from github
      console.log('term : ' + term);
      this.passwordService.searchPasswords(term).subscribe(passwords => {
        this.passwords = passwords;
      });
      
      if (this.pet === "PasswordUpdateDate"){
        this.passwords = this.passwords.sort(this.sortByDate);
      }
      else if (this.pet === "PasswordAlpha"){
        this.passwords = this.passwords.sort(this.sortByName);
      }

    }
  }

  
  sortChanged(value){
    console.log("sortChanged:" + value.checked);

    if(value.checked === false) {
      console.log("sortByDate");
      this.passwords = this.passwords.sort(this.sortByDate);

    }
    else {
      console.log("sortByName");
      this.passwords = this.passwords.sort(this.sortByName);
    }
  }
  onSegmentChanged(value) {
    console.log("onSegmentChanged:" +  this.pet);
    if (this.pet === "PasswordUpdateDate"){
      this.passwords = this.originalPasswords;
      this.passwords = this.passwords.sort(this.sortByDate);
    }
    else if (this.pet === "PasswordAlpha"){
      this.passwords = this.originalPasswords;
      this.passwords = this.passwords.sort(this.sortByName);
    }
  }

  groupContacts(passwords){
        let sortedPassword = passwords.sort(
           function(name1, name2) {
                return name1.name.localeCompare(name2.name);
            }
        );
        let currentLetter = "";
        let currentPasswords = [];
 
        sortedPassword.forEach((value, index) => {
 
          let pp:Password = value;
          let firstChar:string = pp.name.charAt(0);
          console.log("!!!!=" + pp.name);
          console.log(value + "" + index);

            if(firstChar/*value.charAt(0)*/ != currentLetter){
 
                currentLetter = firstChar;//alue.charAt(0);
 
                let newGroup = {
                    letter: currentLetter,
                    passwords: []
                };
 
                currentPasswords = newGroup.passwords;
                this.groupedPasswords.push(newGroup);
            } 
 
            currentPasswords.push(value);
 
        });
 
  }

  convertDateStringsToDates(input) {
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        // TODO: Improve this regex to better match ISO 8601 date strings.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            this.convertDateStringsToDates(value);
        }
    }
}

sortByName(password1, password2) {
      return password1.name.localeCompare(password2.name);
}


sortByDate(password1, password2) {
                console.log("password1.updateDate" + password1.updateDate);

                let d1 = password1.updateDate;
                let d2 = password2.updateDate;
                
                
                if (password1.updateDate === undefined) {
                  console.log("password1.updateDate NULL");
                  d1 = "1970-01-01";
                }
                if (password2.updateDate === undefined) {
                  console.log("password2.updateDate NULL");
                  d2 = "1970-01-01";
                }

                let date1 = new Date(d1);
                let date2 = new Date(d2);

                if (date1 === undefined) {
                  date1 = new Date("1970-01-01");
                }
                if (date2 === undefined) {
                  date2 = new Date("1970-01-01");
                }

                if (date1 > date2) {
                    return -1;
                } else if (date1 < date2) {
                    return 1;
                } else {
                    return 0;
                }
            }
      

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordsPage');
  }

}
