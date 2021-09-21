import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  // @Input() control: FormControl | any;
  @Input() control: FormControl | any;
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';


  constructor() {
  }

  ngOnInit(): void {
  }

  showErrors() {
    const { touched, dirty, errors } = this.control;
    return touched && dirty && errors;
  }

}
