import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album-model';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-all-albums',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './view-all-albums.html',
  styleUrl: './view-all-albums.css',
})
export class ViewAllAlbums implements OnInit {

  allAlbums$: Observable<Album[]> | null = null;
  allAlbums: Album[] = [];

  constructor(
    private albumService: AlbumService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
      this.allAlbums$ = this.albumService.getAllAlbums().pipe(
        tap(albums => this.allAlbums = albums)
      );
  }

  deleteAlbum(id: string): void {
    if (!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          this.allAlbums = this.allAlbums.filter(album => album._id !== id);
          this.allAlbums$ = new Observable(observer => observer.next(this.allAlbums));
        },
        error: (err) => {
          console.error('Error deleting album:', err);
        }
      });
    }
  }
}
