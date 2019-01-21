import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { DashboardPage } from '../dashboard/dashboard';
import { NewPasswordPage } from '../new-password/new-password';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormProvider } from '../../providers/form/form';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public formErrors = {
    name: '',
    email: '',
    password: '',
  };
  public signUpForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public form: FormBuilder,
              public FormService: FormProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.buildForm();
  }

  // build the user edit form
  public buildForm() {
    this.signUpForm = this.form.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(){
    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.signUpForm);

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched 
    if (this.signUpForm.valid) {
      this.navCtrl.setRoot(DashboardPage)
      this.signUpForm.reset();
    } else {
      this.formErrors = this.FormService.validateForm(this.signUpForm, this.formErrors, false)
    }
  }

  signin(){
    this.navCtrl.push(SigninPage)
  }

  forgot(){
    this.navCtrl.push(NewPasswordPage)
  }

}
