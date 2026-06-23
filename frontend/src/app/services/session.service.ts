import { Injectable } from "@angular/core";
import { User } from "../models/user-model";

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private currentUser: User | null = null;

    setUser(user: User): void {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUser(): User | null {
        if (!this.currentUser) {
            const stored = localStorage.getItem('currentUser');
            this.currentUser = stored ? JSON.parse(stored) : null;
        }
        return this.currentUser;
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}