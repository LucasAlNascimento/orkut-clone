import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  firebaseAuth = inject(Auth)

  register(
    name: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, { displayName: name }))

    return from(promise)
  }
}
