import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEmailLowerCase][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailLowerCaseDirective,
      multi: true,
    },
  ],
})
export class EmailLowerCaseDirective implements Validator {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement;
    inputElement.value = inputElement.value.toLowerCase();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const value = control.value;

    if (!value) {
      return null; // If the email field is empty, let the required validator handle it.
    }

    if (!emailPattern.test(value)) {
      return { email: true }; // If the email format is invalid, return an error.
    }

    return null; // Email is valid.
  }
}
