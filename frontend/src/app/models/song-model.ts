import { Artist } from "./artist-model";
import { Album } from "./album-model";

export interface Song {
    _id: string;
    songTitle: string;
    songArtist: string | Artist;
    songReleaseDate?: Date;
    songAlbum?: string | Album;
    songTime?: string;
    userAddedSong: string;
    createdAt?: Date;
    updatedAt?: Date;
}