import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe } from '@angular/common';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-album-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css',
})
export class AlbumDetail implements OnInit {

  // Create & initialize class variables
  albumToDisplay: Album | null = null;
  songsToDisplay: Song[] = [];
  albumAddedDate: Date | null = null;
  isLoading: boolean = true;

  // Instantiate services & imports
  constructor(
    private albumService: AlbumService,
    private songService: SongService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    public sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    // Gets record's ObjectId from URL
    if (id) {                                             // Checks ObjectId is present
        this.albumService.getOneAlbum(id).subscribe({     // Gets a single album record using ObjectId
        next: (album) => {
            this.albumToDisplay = album;
            this.isLoading = false;                       // Used to display loading screen in HTML file
            this.cdr.detectChanges();                     // Triggers page refresh
      },
      error: (err) => {
        console.error('Error loading album:', err);
        this.isLoading = false;
      }
    });
    }
  }

  // Calls 'delete confirmation' service & passes song ObjectId to backend controller to delete song
  deleteSong(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          this.songsToDisplay = this.songsToDisplay.filter(song => song._id !== id);
        }
      })
    }
  }

  // Calls 'delete confirmation' service & passes album ObjectId to backend controller to delete album
  deleteAlbum(id: string | undefined): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          alert('Album successfully deleted');
          this.router.navigate(['/view-all-albums']);
        }, error: (err) => {
          console.error('Error deleting album:', err);
        }
      })
    }
  }
}
