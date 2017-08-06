import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Password } from '../models/password';
import { PasswordResponse } from '../models/passwordResponse';

 import { Platform } from 'ionic-angular';

@Injectable()
export class PasswordService {
  passwords : Array<Password> = null;
  passwordResponse : PasswordResponse =null;
  headers: Headers;
  constructor(public http: Http, private platform: Platform) { }

  load(): Observable<PasswordResponse> {
    console.log("load()");
    var url = 'assets/passwords-mock.json'; 

    if (this.platform.is('cordova') && this.platform.is('android')) {
        url = "/android_asset/www/" + url;
    }
    console.log("url=" + url);
    console.log(Platform);
    return this.http.get(url)
      .map(res => <PasswordResponse>res.json())
      .do(passwordResponse => { this.passwordResponse = passwordResponse;
                    }).catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  // Get github user by providing login(username)
  loadDetails(name: string): Observable<Password> {
    let password = this.passwordResponse.passwords.find(function (pw) {
        return (pw.name === name);
    });

    return Observable.of(password);
  }

   // Search for github users  
  searchPasswords(searchParam: string): Observable<Password[]> {
    // seach by startwith
    //let passwords = this.passwords.filter(function (pw) {
    //    return (pw.name.toLowerCase().startsWith(searchParam));
    //});

    // seach by startwith
    let passwords = this.passwordResponse.passwords.filter(function (pw) {
        var found = pw.name.toLowerCase().includes(searchParam);
        return (found);
    });

    return Observable.of(passwords);

  }

}
