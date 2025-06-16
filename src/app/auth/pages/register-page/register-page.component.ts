import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        this.formUtils.isPasswordOneEqualPasswordTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  // isFieldOneEqualFieldTwo(field1: string, field2: string) {
  //   return (formGroup: AbstractControl) => {
  //     const field1Value = formGroup.get(field1)?.value;
  //     const field2Value = formGroup.get(field2)?.value;

  //     return field1Value === field2Value ? null : { passwordsNotEqual: true };
  //   };
  // }

  onSubmit() {
    if (this.myForm.invalid) return;

    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
