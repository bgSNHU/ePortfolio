import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user-model";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/api/users';

    getAllUsers() {
        return this.http.get<User[]>(this.apiUrl);
    };

    getOneUser(_id: any) {
        return this.http.get<User>(`${this.apiUrl}/${ _id}`);
    };

    addNewUser(user: any) {
        return this.http.post(this.apiUrl, user);
    };

    updateUser(_id: any, user: any) {
        return this.http.put(`${this.apiUrl}/${_id}`, user);
    };

    deleteUser(_id: any) {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    };
};