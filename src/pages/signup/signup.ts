import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../models/user.models';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public userService: UserProvider,
    public authService: AuthProvider
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then(authState => {

      delete formUser.password;
      formUser.uid = authState.uid;

      this.userService.create(formUser)
        .then(() => {
          loading.dismiss();
          console.log('User Cadastrado');
        }).catch(error => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error);
        });
    }).catch(error => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });

  }

  private showLoading() {
    let loading = this.loadCtrl.create({
      content: 'Please wait ...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }
}
