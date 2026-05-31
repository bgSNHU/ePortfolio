import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Playlist } from "../models/playlist-model";

@Injectable({
    providedIn: 'root',
})
export class PlaylistService {

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/api/playlists';

    getAllPlaylists() {
        return this.http.get<Playlist[]>(this.apiUrl);
    };

    getOnePlaylist(_id: any) {
        return this.http.get<Playlist>(`${this.apiUrl}/${ _id}`);
    };

    addNewPlaylist(playlist: any) {
        return this.http.post(this.apiUrl, playlist);
    };

    updatePlaylist(_id: any, playlist: any) {
        return this.http.put(`${this.apiUrl}/${_id}`, playlist);
    };

    deletePlaylist(_id: any) {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    };
};