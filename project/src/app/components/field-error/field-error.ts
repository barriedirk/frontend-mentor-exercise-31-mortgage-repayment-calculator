import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [],
  template: `
    @if (control?.invalid && control?.touched) {
      <div [id]="id" class="red text-present-3">
        @if (control?.errors?.['required']) {
          <small>This field is required.</small>
        }
        @if (control?.errors?.['min']) {
          <small>Value must be greater than 0.</small>
        }
        @if (control?.errors?.['pattern']) {
          <small>Term must be a whole number of years.</small>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldError {
  @Input() id!: string;
  @Input() control!: AbstractControl | null;
}
