import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

@Injectable()
export class UserdataService {

  public username: string;
  public usertoken: string;
  public ploneurl: string;

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {
    storage.ready().then(() => {
      this._loadAll();
    });
  }

  _loadAll() {
    // Load all saved data back into local vars
    this._load('username').then((username) => {
      if (username) {
        this.username = username;
        this._load('usertoken')
          .then(() => {
            return this._load('ploneurl');
          }).then(() => {
            console.log('Resuming as user: ' + this.username);
            this.events.publish('user:resume', this.username);
          });
      } else {
        // else we have no saved data
        console.log('No saved user data found');
      }
    });
  }

  _load(propname: string): Promise<string> {
    // Load a property from device storage into local var
    console.log('Loading: ' + propname);
    return this.storage.get(propname).then((value) => {
      this[propname] = value;
      return value;
    })
  }

  _store(propname: string, val: string) {
    // Store a value in local variables
    // as well as device storage
    console.log('Storing: ' + propname);
    this[propname] = val;
    this.storage.set(propname, val);
  }

  login(ploneurl: string, login: string, password: string) {
    /* Attempt login with login and pw */
    console.log('Login attempt: ' + login);

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
        this._store('username', login);
        this._store('usertoken', token);
        this._store('ploneurl', ploneurl);
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
