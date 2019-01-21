import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// COMPONENTS
import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { VerifyAccountPage } from '../pages/verify-account/verify-account';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ForgotPage } from '../pages/forgot/forgot';
import { NewPasswordPage } from '../pages/new-password/new-password';

// NATIVE
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsProvider } from '../providers/forms/forms';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SigninPage,
    VerifyAccountPage,
    DashboardPage,
    ForgotPage,
    NewPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-dropleft'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SigninPage,
    VerifyAccountPage,
    DashboardPage,
    ForgotPage,
    NewPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FormsProvider
  ]
})
export class AppModule {}
