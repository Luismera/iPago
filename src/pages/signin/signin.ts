import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyAccountPage } from '../verify-account/verify-account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsProvider } from '../../providers/forms/forms';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  
  public myForm: FormGroup;
  public formErrors = {
    fullname: '',
    birthdateYear: '',
    birthdateMonth: '',
    birthdateDay: '',
    identify: '',
    correo: '',
    password: '',
    phone: ''
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
    console.log('ionViewDidLoad SigninPage');
  }

   // build the user edit form
   public buildForm() {
    return this.form.group({
      fullname: ['', [Validators.required]],
      birthdateYear: ['', [Validators.required]],
      birthdateMonth: ['', [Validators.required]],
      birthdateDay: ['', [Validators.required]],
      identify: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  signin(){
    console.log(this.myForm.value);

    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.myForm);

    if(this.myForm.valid){
      this.navCtrl.push(VerifyAccountPage)
      this.myForm.reset();
    }else{
      this.formErrors = this.FormService.validateForm(this.myForm, this.formErrors, false)
      this.ref.detectChanges();
    }
  }

}
