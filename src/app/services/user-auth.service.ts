import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  // private userSubject = new BehaviorSubject<User | null>(null);
  private userSubject =
    new BehaviorSubject<User | null | undefined>(undefined);
  currentUser$ = this.userSubject.asObservable();


  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
    });
  }

  /*
  get currentUser(): User | null {
    return this.userSubject.value;
  }
  */

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
