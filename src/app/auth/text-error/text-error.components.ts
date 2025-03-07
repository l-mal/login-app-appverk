import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-error',
  templateUrl: './text-error.component.html',
  styleUrls: ['./text-error.component.scss'],
  imports: [CommonModule],
})
export class TextErrorComponent {
  @Input() control: AbstractControl | null = null;
}