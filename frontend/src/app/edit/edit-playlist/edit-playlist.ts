import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from '../../models/song-model';
import { Playlist } from '../../models/playlist-model';
import { User } from '../../models/user-model';
import { forkJoin } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-edit-playlist',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-playlist.html',
  styleUrl: './edit-playlist.css',
})
export class EditPlaylist implements OnInit{
  
  editPlaylistForm: FormGroup = new FormGroup({});
  songsDropdown: Song[] = [];
  playlistToDisplay: Playlist | null = null;
  usersDropdown: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router,
    private songService: SongService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private userService: UserService,
    public sessionService: SessionService
  ){}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      this.editPlaylistForm = this.formBuilder.group({
        playlistTitle: ['', Validators.required],
        playlistCreator: ['', Validators.required],
        songs: [[], Validators.required]
      })

      if (id) {
        forkJoin({
          playlist: this.playlistService.getOnePlaylist(id),
          songs: this.songService.getAllSongs(),
          users: this.userService.getAllUsers()
        }).subscribe({
          next: (results) => {
            this.playlistToDisplay = results.playlist;
            this.songsDropdown = results.songs;
            this.usersDropdown = results.users;

            this.editPlaylistForm.patchValue({
              playlistTitle: results.playlist.playlistTitle,
              playlistCreator: typeof results.playlist.playlistCreator === 'object'
              ? (results.playlist.playlistCreator as any)._id: results.playlist.playlistCreator,
              songs: Array.isArray(results.playlist.songs)
              ? results.playlist.songs.map((song: any) =>
              typeof song === 'object'
              ? song._id : song
            ) : []
            })
          }
        })
      }
  }

  onSubmit() {
    if (this.editPlaylistForm.valid && this.playlistToDisplay !== null) {
      this.playlistService.updatePlaylist(this.playlistToDisplay._id, this.editPlaylistForm.value).subscribe({
        next: () => {
          alert('Playlist updated sucessfully');
          this.router.navigate(['/view-all-playlists']);
        }, error: (err) => {
          console.error('Error updating playlist', err);
        }
      });
    }
  }

  deletePlaylist(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.playlistService.deletePlaylist(id).subscribe({
        next: () => {
          alert('Playlist deleted');
          this.router.navigate(['/view-all-playlists']);
        }
      })
    }
  }
}
