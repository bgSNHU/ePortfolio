import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { PlaylistService } from '../services/playlist.service';
import { SongService } from '../services/song.service';
import { Album } from '../models/album-model';
import { Song } from '../models/song-model';
import { Playlist } from '../models/playlist-model';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  randomAlbums: Album[] = [];
  randomSongs: Song[] = [];
  randomPlaylists: Playlist[] = [];
  isLoading: boolean = true;
  isLoggedIn: boolean = true;
  currentUserName: string = '';
  currentUserRole: string = '';

  constructor(
    private albumService: AlbumService, 
    private playlistService: PlaylistService, 
    private songService: SongService,
    private cdr: ChangeDetectorRef,
    public sessionService: SessionService   
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();                     // Checks if user is logged in
    this.currentUserName = this.sessionService.getUser()?.userName || '';   // Gets username of logged in person
    this.currentUserRole = this.sessionService.getUser()?.userRole || '';   // Gets role of current user
    this.cdr.detectChanges();

    forkJoin({                                                              // Gets all albums, songs, and playlists concurrently
      albums: this.albumService.getAllAlbums(),
      songs: this.songService.getAllSongs(),
      playlists: this.playlistService.getAllPlaylists()
      }).subscribe({
        next: (results) => { 
          this.randomAlbums = results.albums.sort(() => 0.5 - Math.random()).slice(0, 5);         // Filters all albums to 5 random selections
          this.randomSongs = results.songs.sort(() => 0.5 - Math.random()).slice(0, 5);           // Filters all songs to 5 random selections
          this.randomPlaylists = results.playlists.sort(() => 0.5 - Math.random()).slice(0, 5);   // Filters all playlists to 5 random selections
          this.isLoading = false;
          this.cdr.detectChanges();                                                               // Triggers page refresh
        },
    error: (err) => {
      console.error('Error loading data:', err);
      this.isLoading = false;
    }
  });
  }

  // Calls session service to logout current user
  logout() {
    this.sessionService.logout();
    this.isLoggedIn = false;
    this.currentUserName = '';
  }
}
