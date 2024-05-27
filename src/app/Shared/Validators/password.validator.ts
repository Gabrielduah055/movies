import { AbstractControl, ValidationErrors } from '@angular/forms';

export const password = (control: AbstractControl): ValidationErrors | null => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const password = control.value;
  if (password && !regex.test(password)) return { password: true };
  return null;
};
