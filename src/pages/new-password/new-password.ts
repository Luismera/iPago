import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsProvider } from '../../providers/forms/forms';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-new-password',
  templateUrl: 'new-password.html',
})
export class NewPasswordPage {

  public myForm: FormGroup;
  public formErrors = {
    code: '',
    password: '',
    repeatPassword: ''
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
    console.log('ionViewDidLoad NewPasswordPage');
  }

  // build the user edit form
  public buildForm() {
    return this.form.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords });
  }

  changePassword(){
    console.log(this.myForm.value);

    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.myForm);
    if(this.myForm.valid){
      this.navCtrl.push(DashboardPage)
      this.myForm.reset();
    }else{
      this.formErrors = this.FormService.validateForm(this.myForm, this.formErrors, false)
      this.ref.detectChanges();
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    console.log(group)
    let pass = group.controls.password['value'];
    let confirmPass = group.controls.confirmPassword['value'];
  
    return pass === confirmPass ? null : { notSame: true }     
  }

}
