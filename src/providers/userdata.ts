import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

@Injectable()
export class UserdataService {

  public username: string;
  public usertoken: string;

  constructor(
    private platform: Platform,
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {
    storage.ready().then(() => {
      this._load();
    });
  }

  _load() {
    // Load saved data back into local vars
    return this.storage.get('username').then((username) => {
      if (username) {
        this.username = username;
        console.log('Resuming as user: ' + this.username);
        this.events.publish('user:resume', this.username);
        //this.ui.presentToast('Logged in as ' + this.username);
        this.storage.get('usertoken').then((token) => {
          this.usertoken = token;
        });
      }
    });
  }

  login(ploneurl: string, email: string, token: string) {
    /* Attempt login with email and OTA */
    console.log('Login attempt: ' + email);
    //this.ui.showLoading('Logging in');

    let options = this._getAuthOptions(true);
    this.http.post(
      ploneurl + '@@login',
      { email, token },
      options
    ).subscribe(
      data => {
        console.log('Login success');
        let token = data.json().token;
        console.log('Got auth token: ' + token);
        this.usertoken = token;
        this.storage.set('usertoken', token);
        this.sync(true);
      },
      err => {
        console.log('Error validating token');
        //this.ui.hideLoading().then(() => {
        //  this.ui.showAlert(
        //    'Token Error',
        //    'The token you entered is invalid.');
        //});
      },
      () => console.log('Login attempt complete')
      );
  }

  _getAuthOptions(app_user?: boolean): RequestOptions {
    let token = this.usertoken;
    /* Generate auth headers for API requests */
    let headers = new Headers(
      { 'Authorization': 'Token ' + token });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  logout() {
    console.log('Logout');
    this.username = '';
    this.storage.remove('username');
    this.storage.remove('userdetails')
    this.usertoken = '';
    this.storage.remove('usertoken');
    this.events.publish('user:logout', this.username);
    //this.ui.presentToast('Logged out');
  }

}
