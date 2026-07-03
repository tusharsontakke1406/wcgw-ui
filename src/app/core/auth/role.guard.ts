import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
export const RoleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const requiredRoles = route.data?.['roles'] as string[];
  if (requiredRoles && requiredRoles.some(role => auth.hasRole(role))) {
    return true;
  }
  return false;
};