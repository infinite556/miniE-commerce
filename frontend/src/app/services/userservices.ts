import { Injectable } from '@angular/core';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  myusers: IUser[] = [
    {
      id: 1,
      age: 25,
      name: 'andro',
      email: 'andro@gmail.com',
      password: 'amdro342',
      passwordConfirm: 'amdro342',
    },
    {
      id: 2,
      age: 30,
      name: 'tone',
      email: 'tonyy@gmail.com',
      password: 'amdro342',
      passwordConfirm: 'amdro342',
    },
    {
      id: 1,
      age: 25,
      name: 'ehap',
      email: 'ehap@gmail.com',
      password: 'amdro342',
      passwordConfirm: 'amdro342',
    },
  ];
  getuserbyid(id: number): IUser | undefined {
    return this.myusers.find((u) => u.id === id);
  }
  login(email: string, password: string): IUser | undefined {
    return this.myusers.find((u) => u.email === email && u.password === password);
  }
  setuser(user: IUser) {
    return localStorage.setItem('user', JSON.stringify(user));
  }
  getuser() {
    return localStorage.getItem('user');
  }
  getcurrentuser(): IUser | null {
    const storedUser = this.getuser();
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as IUser;
    } catch {
      return null;
    }
  }
  register(user: IUser) {
    return this.myusers.push(user);
  }
}
