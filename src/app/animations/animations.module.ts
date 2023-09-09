// animations/animations.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule], // Import BrowserAnimationsModule
  exports: [BrowserAnimationsModule], // Export BrowserAnimationsModule
})
export class AnimationsModule {}
