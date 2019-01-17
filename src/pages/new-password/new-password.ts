import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-new-password',
  templateUrl: 'new-password.html',
})
export class NewPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPasswordPage');
  }

  successChangePassword(){
    this.navCtrl.setRoot(DashboardPage)
  }

}
