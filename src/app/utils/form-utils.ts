import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

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
}
