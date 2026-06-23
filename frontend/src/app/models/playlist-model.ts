import { Song } from "./song-model";
import { User } from "./user-model";

export interface Playlist {
    _id: string;
    playlistTitle: string;
    songs: string[] | Song[];
    playlistCreator: string | User;
    playlistCreationDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}