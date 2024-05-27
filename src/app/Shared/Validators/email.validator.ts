import { AbstractControl, ValidationErrors } from '@angular/forms';

export const emailValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const regex = /^[^@\s]+@[^@\s]+\.[^@]+$/i;
  const email = control.value;
  if (email && !regex.test(email)) return { email: true };
  return null;
};
