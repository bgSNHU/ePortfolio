import { Song } from "./song-model";

export interface Playlist {
    _id: string;
    playlistTitle: string;
    songs: string[] | Song;
    playlistCreator: string;
    playlistCreationDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}