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
    this.isLoggedIn = this.sessionService.isLoggedIn();
    this.currentUserName = this.sessionService.getUser()?.userName || '';
    this.currentUserRole = this.sessionService.getUser()?.userRole || '';
    this.cdr.detectChanges();

    forkJoin({
      albums: this.albumService.getAllAlbums(),
      songs: this.songService.getAllSongs(),
      playlists: this.playlistService.getAllPlaylists()
      }).subscribe({
        next: (results) => {
          this.randomAlbums = results.albums.sort(() => 0.5 - Math.random()).slice(0, 5);
          this.randomSongs = results.songs.sort(() => 0.5 - Math.random()).slice(0, 5);
          this.randomPlaylists = results.playlists.sort(() => 0.5 - Math.random()).slice(0, 5);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
    error: (err) => {
      console.error('Error loading data:', err);
      this.isLoading = false;
    }
  });
  }

  logout() {
    this.sessionService.logout();
    this.isLoggedIn = false;
    this.currentUserName = '';
  }
}
