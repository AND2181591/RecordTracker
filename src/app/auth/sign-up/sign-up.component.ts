import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

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
      Validators.minLength(4), 
      Validators.maxLength(20)
    ]), 
    passwordConfirmation: new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value)
  }

}
