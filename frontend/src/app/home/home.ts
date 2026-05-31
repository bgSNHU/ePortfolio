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

  constructor(
    private albumService: AlbumService, 
    private playlistService: PlaylistService, 
    private songService: SongService,
    private cdr: ChangeDetectorRef,    
  ) {}

  ngOnInit(): void {
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
      console.log('isLoading set to false');
      console.log('randomAlbums:', this.randomAlbums);
      },
    error: (err) => {
      console.error('Error loading data:', err);
      this.isLoading = false;
    }
  });
  }
}
