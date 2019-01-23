import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsProvider } from '../../providers/forms/forms';

@IonicPage()
@Component({
  selector: 'page-verify-account',
  templateUrl: 'verify-account.html',
})
export class VerifyAccountPage {
  
  public myForm: FormGroup;
  public formErrors = {
    verificationCode: 'El codigo es requerido'
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
    console.log('ionViewDidLoad VerifyAccountPage');
  }

  // build the user edit form
  public buildForm() {
    return this.form.group({
      code1: ['', [Validators.required]],
      code2: ['', [Validators.required]],
      code3: ['', [Validators.required]],
      code4: ['', [Validators.required]],
      verificationCode: ['', [Validators.required, Validators.max(4)]]
    });
  }


  verifyAccount(){
    
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

  onKey(event: any) {

  }

}
