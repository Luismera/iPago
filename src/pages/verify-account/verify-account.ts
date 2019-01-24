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
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    verificationCode: ''
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
      code1: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.maxLength(1)]],
      code2: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.maxLength(1)]],
      code3: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.maxLength(1)]],
      code4: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, Validators.maxLength(1)]],
      verificationCode: ['', [Validators.required]]
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

  onInputEntry(event, nextInput) {
    let input = event.target;
    let length = input.value.length;
    let maxLength = input.attributes.maxlength.value;
    let allCode = this.myForm.value.code1+this.myForm.value.code2+this.myForm.value.code3+this.myForm.value.code4
    
    if (allCode.length >= 4) {
      this.myForm.patchValue({
        verificationCode: allCode
      })
    }

    if( nextInput == null){
      this.verifyAccount()
      return false
    }
    
    if (length >= maxLength) {
      nextInput.focus();
    }
  }

}
