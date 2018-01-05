import { User } from './../../models/user.models';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BaseService } from '../base/base';





@Injectable()
export class UserProvider extends BaseService {

  users: AngularFireList<User[]>;

  constructor(
    public af: AngularFireDatabase,
    public http: Http
  ) {
    super();
    this.users = this.af.list('/users');
  }

  create(user) {
    return this.af.database.ref(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username) {
    this.af.list('/users', ref => ref.orderByChild('username').equalTo(username))
      .map(users => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }

}
