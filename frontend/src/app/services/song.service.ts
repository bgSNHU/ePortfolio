import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Song } from "../models/song-model";

@Injectable({
    providedIn: 'root',
})
export class SongService {

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/api/songs';

    getAllSongs() {
        return this.http.get<Song[]>(this.apiUrl);
    };

    getSongsByArtist(artistId: any) {
        return this.http.get<Song[]>(`${this.apiUrl}/artist/${artistId}`);
    }

    getSongsByAlbum(songAlbum: any) {
        return this.http.get<Song[]>(`${this.apiUrl}/album/${songAlbum}`);
    }

    getOneSong(_id: any) {
        return this.http.get<Song>(`${this.apiUrl}/${ _id}`);
    };

    addNewSong(song: any) {
        return this.http.post(this.apiUrl, song);
    };

    updateSong(_id: any, song: any) {
        return this.http.put(`${this.apiUrl}/${_id}`, song);
    };

    deleteSong(_id: any) {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    };
};