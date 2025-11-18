import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IonInput, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-theme-input',
  templateUrl: './theme-input.component.html',
  styleUrls: ['./theme-input.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonIcon
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThemeInputComponent),
      multi: true
    }
  ]
})
export class ThemeInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() disabled = false;

  @Input() iconStart?: string;
  @Input() iconEnd?: string;

  @Input() error?: string;
  @Input() showError = false;

  value: any = '';

  constructor() { }

  ngOnInit() { }

  // CVA callbacks
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(val: any) {
    this.value = val;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  updateValue(ev: any) {
    const val = ev.target?.value;
    this.value = val;
    this.onChange(val);
  }
}
