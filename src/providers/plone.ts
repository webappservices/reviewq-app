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
    // Get all items matching a certain state
    if (!state) {
      state = 'pending';
    }
    let options = this.userdata.getAuthOptions();
    let catalog_url = this.userdata.ploneurl + '/@search?sort_on=created&sort_order=reverse&metadata_fields=UID&review_state=' + state;
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

  getDetail(item) {
    // Get full object for specific item
    let options = this.userdata.getAuthOptions();
    let url = item['@id'];
    return new Promise(resolve => {
      this.http.get(
        url,
        options
      ).subscribe(
        data => {
          console.log(data.json());
          return resolve(data.json());
        },
        err => {
          console.log('Error loading item:' + url);
          console.error(err);
        }
        );
    });
  }

  transition(item, transition_name: string) {
    let options = this.userdata.getAuthOptions();
    let url = item['@id'];
    return new Promise(resolve => {
      this.http.post(
        url + '/@workflow/' + transition_name,
        {},
        options
      ).subscribe(
        data => {
          console.log(data.json());
          return resolve(data.json());
        },
        err => {
          console.log('Error on transition:' + url);
          console.error(err);
        }
        );
    });
  }
}
