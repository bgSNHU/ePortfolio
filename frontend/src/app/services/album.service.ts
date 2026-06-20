import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Album } from "../models/album-model";

@Injectable({
    providedIn: 'root',
})
export class AlbumService {

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/api/albums';

    getAllAlbums() {
        return this.http.get<Album[]>(this.apiUrl);
    };

    getOneAlbum(_id: any) {
        return this.http.get<Album>(`${this.apiUrl}/${ _id}`);
    };

    getAlbumsByArtist(artistId: any) {
        return this.http.get<Album[]>(`${this.apiUrl}/artist/${artistId}`);
    }

    addNewAlbum(album: any) {
        return this.http.post(this.apiUrl, album);
    };

    updateAlbum(_id: any, album: any) {
        return this.http.put(`${this.apiUrl}/${_id}`, album);
    };

    deleteAlbum(_id: any) {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    };
};