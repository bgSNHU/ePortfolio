import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Playlist } from '../../models/playlist-model';
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PlaylistService } from '../../services/playlist.service';
import { subscribe } from 'diagnostics_channel';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-view-all-playlists',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './view-all-playlists.html',
  styleUrl: './view-all-playlists.css',
})
export class ViewAllPlaylists implements OnInit {

  allPlaylists$: Observable<Playlist[]> | null = null;
  allPlaylists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private confirmDialogService: ConfirmDialogService,
    public sessionService: SessionService
  ){}

  ngOnInit(): void {
      this.allPlaylists$ = this.playlistService.getAllPlaylists().pipe(
        tap(playlists => this.allPlaylists = playlists)
      );
  }

  deletePlaylist(id: string): void {
    if (!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.playlistService.deletePlaylist(id).subscribe({
        next: () => {
          this.allPlaylists = this.allPlaylists.filter(playlist => playlist._id !== id);
          this.allPlaylists$ = new Observable(observer => observer.next(this.allPlaylists));
        },
        error: (err) => {
          console.error('Error deleting playkist:', err);
        }
      });
    }
  }
}
