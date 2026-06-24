import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from '../../models/song-model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../models/user-model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-add-playlist',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-playlist.html',
  styleUrl: './add-playlist.css',
})

export class AddPlaylist implements OnInit{

  // Create and intialize class variables
  addPlaylistForm: FormGroup = new FormGroup({});
  allSongsDropdown: Song [] = [];
  allUsersDropdown: User[] = [];
  currentUserRole: string = '';
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  currentUserName: string = '';

  // Initialize services & imports
  constructor(
    private formBuilder: FormBuilder,
    private songService: SongService,
    private playlistService: PlaylistService,
    private router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {

    // Gets info about current user logged in
    this.isLoggedIn = this.sessionService.isLoggedIn();
    this.currentUser = this.sessionService.getUser();
    if (this.currentUser !== null) {
      this.currentUserName =  this.currentUser?.userName;
    };
    this.currentUserRole = this.sessionService.getUser()?.userRole || '';

    // Create form for new Playlist entry
    this.addPlaylistForm = this.formBuilder.group({
      playlistTitle: ['', Validators.required],
      playlistCreator: [this.currentUser?._id || '', Validators.required],
      songs: [[], Validators.required],
    });

    // Call and subscribe to service call to retrieve all songs
    this.songService.getAllSongs().subscribe({
      next: (songs) => {
          this.allSongsDropdown = songs;
      }, error: (err) => {
        console.error('Error loading songs: ', err);
      }
    })
  }

  // Passes new Playlist info to backend controller
  onSubmit() {
    if (this.addPlaylistForm.valid) {
      console.log('Form value: ', this.addPlaylistForm.value);
      this.playlistService.addNewPlaylist(this.addPlaylistForm.value).subscribe({
        next: () => {
          alert('Playlist added successfully!');
          this.router.navigate(['/view-all-playlists']);
        }, error: (err) => {
          console.error('Error adding playlist: ', err);
        }
      })
    }
  }
}
