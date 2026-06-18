import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    message: string = '';
    messageType: string = '';

    showSuccess(message: string): void {
        this.message = message;
        this.messageType = 'success';
        setTimeout(() => this.clearMessage(), 3000);
    }

    showError(message: string): void {
        this.message = message;
        this.messageType = 'error';
    }

    clearMessage(): void {
        this.message = '';
        this.messageType = '';
        setTimeout(() => this.clearMessage(), 3000);
    }
}