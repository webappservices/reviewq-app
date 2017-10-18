import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events, ToastController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

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
    public toastCtrl: ToastController,
  ) {
    // Refresh on login
    events.subscribe('user:login', (userEventData) => {
      this.presentToast('Logged in');
      this.refresh();
    });
    // Refresh on resume
    events.subscribe('user:resume', (userEventData) => {
      this.refresh();
    });
    // Refresh on state change
    events.subscribe('item:changed', (transition) => {
      this.presentToast('Item ' + transition);
      this.refresh();
    });
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 1500
    }).present();
  }

  login(creds) {
    // Log in via the userdata service
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
    // Logout
    this.userdata.logout();
  }

  refresh() {
    // Refresh listing
    console.log('Refreshing...');
    return this.plone.getItems().then((items) => {
      this.items = items;
    });
  }

  doRefresh(refresher) {
    // Called from the UI refresher
    this.refresh().then(() => {
      refresher.complete();
    }, (err) => {
      refresher.complete();
    });
  }

  selectItem(item) {
    this.plone.getDetail(item).then((fullitem) => {
      this.navCtrl.push(DetailPage, { item: fullitem });
    });
  }

}
