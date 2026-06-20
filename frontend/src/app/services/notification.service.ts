import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private messageSource = new BehaviorSubject<string>('');
    private typeSource = new BehaviorSubject<string>('');
    
    message$ = this.messageSource.asObservable();
    messageType$ = this.typeSource.asObservable();

    showSuccess(message: string): void {
        this.messageSource.next(message);
        this.typeSource.next('success');
        setTimeout(() => this.clearMessage(), 3000);
    }

    showError(message: string): void {
        this.messageSource.next(message);
        this.typeSource.next('error');
        setTimeout(() => this.clearMessage(), 3000);
    }

    clearMessage(): void {
        this.messageSource.next('');
        this.typeSource.next('');
    }
}