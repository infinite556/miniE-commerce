import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Userservices } from '../../services/userservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerform: FormGroup;
  constructor(
    private fp: FormBuilder,
    private userservice: Userservices,
    private router: Router,
  ) {
    this.registerform = this.fp.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.minLength(4)]],
      id: [0, [Validators.required, Validators.min(1)]],
    });
  }
  register() {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }
    if (this.registerform.value.password !== this.registerform.value.passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    const { email, password, passwordConfirm, name, age, id } = this.registerform.value;
    const newuser = { email, password, passwordConfirm, name, age, id };
    this.userservice.register(newuser);
    alert('register successful');
    this.userservice.setuser(newuser);
    this.router.navigate(['/orders']);
  }
}
