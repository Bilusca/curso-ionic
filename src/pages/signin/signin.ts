import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        this.signinForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
  }

  onSubmit() {
    console.log(this.signinForm.value);
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
