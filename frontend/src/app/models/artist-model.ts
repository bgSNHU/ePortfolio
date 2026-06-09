export interface Artist {
    _id: string;
    artistName: string;
    artistBirthday?: Date;
    artistSongs?: string[];
    artistAlbums?: string[];
    userAddedAlbum: string;
}