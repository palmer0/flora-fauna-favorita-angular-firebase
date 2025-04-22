import {Component, inject} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {UserAuthService} from './services/user-auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private router = inject(Router);
  private userAuthService = inject(UserAuthService);

  user = this.userAuthService.currentUser$;
  currentRoute: string = '';
  //menuOpen = true;

  constructor() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  /*
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  */

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }
}
