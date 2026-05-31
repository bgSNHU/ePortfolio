import { Song } from './song-model';
import { Artist } from './artist-model'

export interface Playlist {
    _id?: string;
    playlistTitle: string;
    songs: [ Song['songTitle'], Artist['artistName'] ];
    playlistCreator: string;
    playlistCreationDate: Date;
}