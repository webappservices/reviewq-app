import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserdataService } from './userdata';

@Injectable()
export class PloneService {

  constructor(
    public http: Http,
    public userdata: UserdataService,
  ) {

  }

  getItems(state?: string): Promise<any[]> {
    if (!state) {
      state = 'pending';
    }
    let options = this.userdata.getAuthOptions();
    let catalog_url = this.userdata.ploneurl + '/@search?sort_on=created&sort_order=reverse&review_state=' + state;
    return new Promise(resolve => {
      this.http.get(
        catalog_url,
        options
      ).subscribe(
        data => {
          console.log(data.json());
          return resolve(data.json().items);
        },
        err => {
          console.log('Error loading items');
          console.error(err);
        }
        );
    });
  }
}
