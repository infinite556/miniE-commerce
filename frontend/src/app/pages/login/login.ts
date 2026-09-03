import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservices } from '../../services/userservices';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginform: FormGroup;

  constructor(
    private userservice: Userservices,
    private fp: FormBuilder,
    private router: Router,
  ) {
    this.loginform = this.fp.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginform.value;
    const loginuser = this.userservice.login(email, password);

    if (loginuser) {
      console.log('login successful');
      this.userservice.setuser(loginuser);
      this.router.navigate(['/posts']);
    } else {
      console.log('login failed');
      this.loginform.reset();
    }
  }
}
