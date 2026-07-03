import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { User } from '../../shared/models/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);
  constructor(private msal: MsalService, private router: Router) {
    this.loadUser();
  }
  private loadUser() {
    const account = this.msal.instance.getActiveAccount();
    if (account) {
      this.userSignal.set({
        id: account.homeAccountId,
        email: account.username,
        roles: account.idTokenClaims?.roles || []
      });
    }
  }
  get user() {
    return this.userSignal.asReadonly();
  }
  isAuthenticated(): boolean {
    return !!this.userSignal();
  }
  hasRole(role: string): boolean {
    return this.userSignal()?.roles.includes(role) ?? false;
  }
  login() {
    this.msal.loginRedirect();
  }
  logout() {
    this.msal.logoutRedirect();
    this.userSignal.set(null);
  }
}