export interface User {
    _id: string;
    userName: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userSongContributions?: string[];
    userArtistContributions?: string[];
    userPlaylistContributions?: string[];
    userPlaylists?: string[];
    userRole: string;
    userPassword: string;
    createdAt?: Date;
    updatedAt?: Date;
}