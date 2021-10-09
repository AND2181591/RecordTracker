import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]), 
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6), 
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.signInForm.value)
      .catch(error => {
        console.log("Sign in... ", error);
      });
  }

}
