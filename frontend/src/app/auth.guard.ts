import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from './services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
    const sessionService = inject(SessionService);
    const router = inject(Router);
    const currentUser = sessionService.getUser();
    
    if (currentUser !== null) {
        if (sessionService.isLoggedIn() && currentUser.userRole !== 'viewer') {
            return true;
        }
    };
    
    alert('You must be an Admin or Editor to perform this action.')
    router.navigate(['/']);
    return false;
};