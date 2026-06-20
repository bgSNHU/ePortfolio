import { Song } from "./song-model";
import { Album } from "./album-model";

export interface Artist {
    _id: string;
    artistName: string;
    artistBirthday?: Date;
    userAddedAlbum: string;
    createdAt?: Date;
    updatedAt?: Date;
}