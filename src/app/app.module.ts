import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';

import { CustomHeaderComponent } from './../components/custom-header/custom-header';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { UserProvider } from '../providers/user/user';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { BaseProvider } from '../providers/base/base';
import { SigninPage } from '../pages/signin/signin';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDZRYg_vTw77XhIuCea6bH6gBWCA03ZHps",
  authDomain: "ionic-chat-app-2c81d.firebaseapp.com",
  databaseURL: "https://ionic-chat-app-2c81d.firebaseio.com",
  projectId: "ionic-chat-app-2c81d",
  storageBucket: "ionic-chat-app-2c81d.appspot.com",
  messagingSenderId: "34493008685"
}

@NgModule({
  declarations: [
    MyApp,
    CustomHeaderComponent,
    HomePage,
    SignupPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    HttpModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    AuthProvider
  ]
})
export class AppModule { }
