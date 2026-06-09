export interface Album {
    _id: string;
    albumName: string;
    albumArtist: string;
    albumReleaseDate?: Date;
    albumGenre?: string;
    albumSongs?: string[];
    userAdded?: string;
}