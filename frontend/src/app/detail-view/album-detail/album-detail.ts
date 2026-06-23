import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  albumToDisplay: Album | null = null;
  songsToDisplay: Song[] = [];
  albumAddedDate: Date | null = null;
  isLoading: boolean = true;

  constructor(
    private albumService: AlbumService,
    private songService: SongService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {   
        this.albumService.getOneAlbum(id).subscribe({
        next: (album) => {
            this.albumToDisplay = album;
            this.isLoading = false;
            this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading album:', err);
        this.isLoading = false;
      }
    });
    }
  }

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
}
