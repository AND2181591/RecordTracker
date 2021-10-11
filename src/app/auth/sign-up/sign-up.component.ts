import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [ 
      Validators.required, 
      Validators.email 
    ]),
    username: new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20)
    ]),  
    password: new FormControl('', [ 
      Validators.required, 
      Validators.minLength(6), 
      Validators.maxLength(20)
    ]), 
    passwordConfirmation: new FormControl('', [ 
      Validators.required, 
      Validators.minLength(6), 
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchPassword.validate] });

  constructor( 
    private authService: AuthService, 
    private matchPassword: MatchPassword
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value);
  }
}
