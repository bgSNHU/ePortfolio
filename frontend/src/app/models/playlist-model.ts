export interface Playlist {
    _id: string;
    playlistTitle: string;
    songs: string[];
    playlistCreator: string;
    playlistCreationDate?: Date;
}