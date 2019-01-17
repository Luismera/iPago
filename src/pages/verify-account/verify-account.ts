import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-verify-account',
  templateUrl: 'verify-account.html',
})
export class VerifyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyAccountPage');
  }

  verifyAccount(){
    this.navCtrl.push(DashboardPage)
  }

}
