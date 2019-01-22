import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormsProvider {

  constructor() {
    console.log('Hello FormsProvider Provider');
  }

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      //console.log(control);
      control.markAsTouched();
      control.markAsDirty();
      if (control.controls) { 
          control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

 // return list of error messages
 // 
 public validationMessages() {
  const messages = {
    required: 'Este campo es obligatorio',
    email: 'Esta dirección de correo electrónico no es válida',
    invalid_characters: (matches: any[]) => {

      let matchedCharacters = matches;

      matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
        let string = characterString;
        string += character;

        if (matchedCharacters.length !== index + 1) {
          string += ', ';
        }

        return string;
      }, '');

      return `These characters are not allowed: ${matchedCharacters}`;
    },
  };

  return messages;
 }


  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);

        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }


}
