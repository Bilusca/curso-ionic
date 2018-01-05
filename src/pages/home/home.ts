import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Observable } from 'rxjs/Observable';

import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user.models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserProvider
  ) {

  }

  ionViewDidLoad() {
    this.users = this.userService.users.valueChanges();
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User): void {
    console.log(user);
  }
}
