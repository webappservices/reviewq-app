import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';

import { PloneService } from '../../providers/plone';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  item: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plone: PloneService,
    public events: Events,
  ) {
    this.item = navParams.get('item');
    console.log(this.item);
  }

  accept() {
    // Publish the item
    this.plone.transition(this.item, 'publish');
    this.close();
  }

  reject() {
    // Send the item back
    this.plone.transition(this.item, 'reject');
    this.close();
  }

  close() {
    this.events.publish('item:changed', this.item);
    this.navCtrl.pop();
  }

}
