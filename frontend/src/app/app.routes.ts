import { Routes } from '@angular/router';

// Import home component
import { Home } from './home/home';

// Import album components
import { AddAlbum } from './add-new/add-album/add-album';
import { AlbumDetail } from './detail-view/album-detail/album-detail';
import { ViewAllAlbums } from './view-all/view-all-albums/view-all-albums';
import { EditAlbum } from './edit/edit-album/edit-album';

// Import artist components
import { AddArtist } from './add-new/add-artist/add-artist';
import { ArtistDetail } from './detail-view/artist-detail/artist-detail';
import { ViewAllArtists } from './view-all/view-all-artists/view-all-artists';
import { EditArtist } from './edit/edit-artist/edit-artist';

// Import playlist components
import { AddPlaylist } from './add-new/add-playlist/add-playlist';
import { PlaylistDetail } from './detail-view/playlist-detail/playlist-detail';
import { ViewAllPlaylists } from './view-all/view-all-playlists/view-all-playlists';
import { EditPlaylist } from './edit/edit-playlist/edit-playlist';

// Import song components
import { AddSong } from './add-new/add-song/add-song';
import { SongDetail } from './detail-view/song-detail/song-detail';
import { ViewAllSongs } from './view-all/view-all-songs/view-all-songs';
import { EditSong } from './edit/edit-song/edit-song';

// Import user components
import { AddUser } from './add-new/add-user/add-user';
import { UserDetail } from './detail-view/user-detail/user-detail';
import { ViewAllUsers } from './view-all/view-all-users/view-all-users';
import { EditUser } from './edit/edit-user/edit-user';

export const routes: Routes = [

    // Home path
    { path: '', component: Home },

    // Album paths
    { path: 'add-album', component: AddAlbum },
    { path: 'view-one-album/:id', component: AlbumDetail },
    { path: 'view-all-albums', component: ViewAllAlbums },
    { path: 'edit-album/:id', component: EditAlbum },

    //Artist paths
    { path: 'add-artist', component: AddArtist },
    { path: 'view-one-artist/:id', component: ArtistDetail },
    { path: 'view-all-artists', component: ViewAllArtists },
    { path: 'edit-artist/:id', component: EditArtist },


    // Playlist paths
    { path: 'add-playlist', component: AddPlaylist },
    { path: 'view-one-playlist/:id', component: PlaylistDetail },
    { path: 'view-all-playlists', component: ViewAllPlaylists },
    { path: 'edit-playlist/:id', component: EditPlaylist },


    // Song paths
    { path: 'add-song', component: AddSong },
    { path: 'view-one-song/:id', component: SongDetail },
    { path: 'view-all-songs', component: ViewAllSongs },
    { path: 'edit-song/:id', component: EditSong },


    // User paths
    { path: 'add-user', component: AddUser },
    { path: 'view-one-user/:id', component: UserDetail },
    { path: 'view-all-users', component: ViewAllUsers },
    { path: 'edit-user/:id', component: EditUser },

    // Universal path
    { path: '**', redirectTo: '' },
];
