import { trigger, transition, style, animate } from '@angular/animations';

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
  ]),
]);
