import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Artist } from '../../models/artist-model';
import { ArtistService } from '../../services/artist.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-view-all-artists',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './view-all-artists.html',
  styleUrl: './view-all-artists.css',
})
export class ViewAllArtists  implements OnInit {

  allArtists$: Observable<Artist[]> | null = null;
  allArtists: Artist[] = [];

  constructor(
    private artistService: ArtistService,
    private confirmDialogService: ConfirmDialogService,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
      this.allArtists$ = this.artistService.getAllArtists().pipe(
        tap(artists => this.allArtists = artists)
      );
  }

  deleteArtist(id: string): void {
    if (!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.artistService.deleteArtist(id).subscribe({
        next: () => {
          this.allArtists = this.allArtists.filter(artist => artist._id !== id);
          this.allArtists$ = new Observable(observer => observer.next(this.allArtists));
        },
        error: (err) => {
          console.error('Error deleting artist:', err);
        }
      });
    }
  }
}
