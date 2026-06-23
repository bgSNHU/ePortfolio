import { Artist } from "./artist-model";
import { Song } from "./song-model";

export interface Album {
    _id: string;
    albumName: string;
    albumArtist: string | Artist;
    albumReleaseDate?: Date;
    albumGenre?: string;
    albumSongs?: string[] | Song;
    userAddedAlbum?: string;
    createdAt?: Date;
    updatedAt?: Date;
}