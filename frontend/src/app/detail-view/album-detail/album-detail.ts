import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
//const { ObjectId } = require('mongodb');

@Component({
  selector: 'app-album-detail',
  imports: [RouterLink],
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
    private ngZone: NgZone,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      forkJoin({      
        album: this.albumService.getOneAlbum(id),
        albumSongs: this.songService.getSongsByAlbum(id),
      }).subscribe({
        next: (results) => {
          this.ngZone.run(() => {
            this.albumToDisplay = results.album;
            this.songsToDisplay = results.albumSongs;
            this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error loading album:', err);
        this.isLoading = false;
      }
    });
    //this.albumAddedDate = ObjectId(id).getTimestamp();
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
