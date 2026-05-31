import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ConfirmDialogService {
    confirmDelete(): boolean {
        return window.confirm('Are you sure you want to delete this?');
    };
}