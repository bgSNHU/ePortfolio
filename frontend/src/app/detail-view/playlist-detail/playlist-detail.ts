import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Playlist } from '../../models/playlist-model';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe } from '@angular/common';
import { SongService } from '../../services/song.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-playlist-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './playlist-detail.html',
  styleUrl: './playlist-detail.css',
})
export class PlaylistDetail implements OnInit{

  // Create & initialize class variables
  playlistToDisplay: Playlist | null = null;
  playlistSongCount: String = '';
  
  // Instantiate services & imports
  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private songService: SongService,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');      // Gets ObjectId from URL

      if(id) {                                                // Checks if ObjectId is present
        this.playlistService.getOnePlaylist(id).subscribe({   // Calls playlist service to get a single playlist
          next: (playlist) => {
            this.playlistToDisplay = playlist;
            this.cdr.detectChanges();
          }, error: (err) => {
            console.error('Error loading playlist: ', err);
          }
        })
      }
  }

  // Calls delete confirmation service then passes playlist id to controller to delete playlist
  deletePlaylist(id: string | undefined): void {
    if(!id) return;
    if(this.confirmDialogService.confirmDelete()) {
      this.playlistService.deletePlaylist(id).subscribe({
        next: () => {
          alert('Playlist successfully deleted');
          this.router.navigate(['/view-all-playlists']);
        }, error: (err) => {
          console.error('Error deleting playlist', err);
        }
      })
    }
  }

  // Calls delete confirmation service then passes song id to controller to delete song
  deleteSong(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          alert('Song successfully deleted');
          this.cdr.detectChanges();
        }
      })
    }
  }

}
