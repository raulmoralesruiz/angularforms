import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

const sleep = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
};

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
        case 'email':
          return `El valor introducido no es un correo electrónico`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'El formato de correo electrónico no es correcto';
          }
          return `Error de patrón con expresión regular`;
        case 'emailTaken':
          return `El correo electrónico ya está en uso`;
        case 'notUserRaul':
          return `El usuario está reservado, no se puede usar`;
        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldname: string): boolean | null {
    return (
      !!form.controls[fieldname].errors && form.controls[fieldname].touched
    );
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    const field = formArray.controls[index];
    return field.errors && field.touched;
  }

  static getFieldError(form: FormGroup, fieldname: string): string | null {
    if (!form.controls[fieldname]) return null;

    const errors = form.controls[fieldname].errors ?? {};

    return this.getTextErrors(errors);
  }

  static getFieldInArrayError(
    formArray: FormArray,
    index: number
  ): string | null {
    const field = formArray.controls[index];
    if (!field) return null;

    const errors = field.errors ?? {};

    return this.getTextErrors(errors);
  }

  static isPasswordOneEqualPasswordTwo(pass1: string, pass2: string) {
    return (formGroup: AbstractControl) => {
      const pass1Value = formGroup.get(pass1)?.value;
      const pass2Value = formGroup.get(pass2)?.value;

      return pass1Value === pass2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando email en servidor');
    await sleep(); // esperar 2 seg

    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static notUserRaul(control: AbstractControl): ValidationErrors | null {
    console.log('Validando notUserRaul');

    const formValue = control.value;
    return formValue === 'raul22' ? { notUserRaul: true } : null;
  }
}
