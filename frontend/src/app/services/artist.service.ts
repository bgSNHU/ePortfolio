import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Artist } from "../models/artist-model";

@Injectable({
    providedIn: 'root',
})
export class ArtistService {

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/api/artists';

    getAllArtists() {
        return this.http.get<Artist[]>(this.apiUrl);
    };

    getOneArtist(_id: any) {
        return this.http.get<Artist>(`${this.apiUrl}/${ _id}`);
    };

    addNewArtist(artist: any) {
        return this.http.post(this.apiUrl, artist);
    };

    updateArtist(_id: any, artist: any) {
        return this.http.put(`${this.apiUrl}/${_id}`, artist);
    };

    deleteArtist(_id: any) {
        return this.http.delete(`${this.apiUrl}/${_id}`);
    };
};