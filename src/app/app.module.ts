import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


const firebaseAuth = {
    apiKey: "AIzaSyBULHbBsNahEIrgje_CTtAqDtc5Iz7vl6w",
    authDomain: "tingting-263c9.firebaseapp.com",
    databaseURL: "https://tingting-263c9.firebaseio.com",
    projectId: "tingting-263c9",
    storageBucket: "tingting-263c9.appspot.com",
    messagingSenderId: "814914916467"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    Geolocation
  ]
})
export class AppModule {}
