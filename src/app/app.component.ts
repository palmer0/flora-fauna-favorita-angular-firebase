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

  //user = this.userAuthService.currentUser$;
  currentRoute: string = '';
  user: any = null;

  constructor() {
    this.userAuthService.currentUser$.subscribe((user) => {
      this.user = user;
    });


    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }


  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }
}
