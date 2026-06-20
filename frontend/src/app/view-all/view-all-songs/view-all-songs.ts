import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-view-all-songs',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './view-all-songs.html',
  styleUrl: './view-all-songs.css',
})
export class ViewAllSongs implements OnInit {

  allSongs$: Observable<Song[]> | null = null;
  allSongs: Song[] = [];

  constructor(
    private songService: SongService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
      this.allSongs$ = this.songService.getAllSongs().pipe(
        tap(songs => this.allSongs = songs)
      );
  }

  deleteSong(id: string): void {
    if (!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          this.allSongs = this.allSongs.filter(song => song._id !== id);
          this.allSongs$ = new Observable(observer => observer.next(this.allSongs));
        },
        error: (err) => {
          console.error('Error deleting song:', err);
        }
      });
    }
  }
}
