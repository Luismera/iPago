import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.navCtrl.setRoot(DashboardPage)
  }

  signin(){
    this.navCtrl.push(SigninPage)
  }

}
