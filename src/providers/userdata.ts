import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

@Injectable()
export class UserdataService {

  public username: string;
  public usertoken: string;

  constructor(
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
        //this.ui.presentToast('Logged in as ' + this.username);
        this.storage.get('usertoken').then((token) => {
          this.usertoken = token;
          this.events.publish('user:resume', this.username);
        });
      }
    });
  }

  login(ploneurl: string, login: string, password: string) {
    /* Attempt login with login and pw */
    console.log('Login attempt: ' + login);
    //this.ui.showLoading('Logging in');

    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(
      ploneurl + '/@login',
      { login, password },
      options
    ).subscribe(
      data => {
        console.log('Login success');
        let token = data.json().token;
        console.log('Got auth token: ' + token);
        this.username = login;
        this.storage.set('username', login);
        this.usertoken = token;
        this.storage.set('usertoken', token);
        this.events.publish('user:login', this.username);
      },
      err => {
        console.log('Error validating token');
        console.error(err);
      },
      () => console.log('Login attempt complete')
      );
  }

  getAuthOptions(app_user?: boolean): RequestOptions {
    let token = this.usertoken;
    /* Generate auth headers for API requests */
    let headers = new Headers({
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  logout() {
    console.log('Logout');
    this.username = '';
    this.storage.remove('username');
    this.usertoken = '';
    this.storage.remove('usertoken');
    this.events.publish('user:logout', this.username);
    //this.ui.presentToast('Logged out');
  }

}
