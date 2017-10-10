import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { UserdataService } from '../../providers/userdata';
import { PloneService } from '../../providers/plone';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [];

  constructor(
    public navCtrl: NavController,
    public userdata: UserdataService,
    public plone: PloneService,
    public events: Events,
  ) {
    events.subscribe('user:login', (userEventData) => {
      this.refresh();
    });
    events.subscribe('user:resume', (userEventData) => {
      this.refresh();
    });
  }

  login(creds) {
    console.log(creds);
    if (creds.username && creds.password) {
      this.userdata.login(
        creds.ploneurl,
        creds.username,
        creds.password,
      );
    }
  }

  logout() {
    this.userdata.logout();
  }

  refresh() {
    console.log('Refreshing...');
    return this.plone.getItems().then((items) => {
      this.items = items;
    });
  }

  doRefresh(refresher) {
    // Called from the UI
    this.refresh().then(() => {
      refresher.complete();
    }, (err) => {
      refresher.complete();
    });
  }

}
