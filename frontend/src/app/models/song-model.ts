export interface Song {
    _id: string;
    songTitle: string;
    songArtist: string;
    songReleaseDate?: Date;
    songAlbum?: string;
    songTime?: string;
}