import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { PlaylistService } from '../../services/playlist.service';
import { UserService } from '../../services/user.service';
import { Song } from '../../models/song-model';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-playlist',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-playlist.html',
  styleUrl: './add-playlist.css',
})
export class AddPlaylist implements OnInit{
  addPlaylistForm: FormGroup = new FormGroup({});
  allSongsDropdown: Song [] = [];

  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private songService: SongService,
    private playlistService: PlaylistService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.addPlaylistForm = this.formBuilder.group({
        playlistTitle: ['', Validators.required],
        playlistCreator: ['', Validators.required],
        songs: ['', Validators.required]
      });

      this.songService.getAllSongs().subscribe({
        next: (songs) => {
          this.ngZone.run(() => {
            this.allSongsDropdown = songs;
          });
        }, error: (err) => {
          console.error('Error loading songs: ', err);
        }
      })
  }

  onSubmit() {
    if (this.addPlaylistForm.valid) {
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
