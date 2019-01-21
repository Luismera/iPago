import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { DashboardPage } from '../dashboard/dashboard';
import { NewPasswordPage } from '../new-password/new-password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsProvider } from '../../providers/forms/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public myForm: FormGroup;
  public formErrors = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public form: FormBuilder,
              private ref: ChangeDetectorRef,
              public FormService: FormsProvider) {
    
    this.myForm = this.buildForm();

    this.myForm.valueChanges.subscribe((data) => {
      this.formErrors = this.FormService.validateForm(this.myForm, this.formErrors, true)
      //console.log("errores :", this.formErrors);
      this.ref.detectChanges();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.buildForm();
  }

  // build the user edit form
  public buildForm() {
    return this.form.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(){
    console.log(this.myForm.value);

    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.myForm);

    if(this.myForm.valid){
      this.navCtrl.setRoot(DashboardPage)
      this.myForm.reset();
    }else{
      this.formErrors = this.FormService.validateForm(this.myForm, this.formErrors, false)
      this.ref.detectChanges();
    }
  }

  signin(){
    this.navCtrl.push(SigninPage)
  }

  forgot(){
    this.navCtrl.push(NewPasswordPage)
  }

}
