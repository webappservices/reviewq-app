import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserdataService } from '../../providers/userdata';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public userdata: UserdataService,
  ) {

  }

  login(creds) {
    console.log(creds);
    if (creds.username && creds.password) {
      this.userdata.login(
        'http://localhost:8080/Plone',
        creds.username,
        creds.password
      );
    }
  }

  logout() {
    this.userdata.logout();
  }

}
