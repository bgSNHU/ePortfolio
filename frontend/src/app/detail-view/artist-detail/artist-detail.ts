import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Artist } from '../../models/artist-model';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe } from '@angular/common';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-artist-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.css',
})
export class ArtistDetail implements OnInit{

  artistToDisplay: Artist | null = null;
  songsToDisplay: Song[] = [];
  albumsToDisplay: Album[] = [];
  isLoading: boolean = true;

  constructor(
    private artistService: ArtistService,
    private songService: SongService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      forkJoin ({   
        artist: this.artistService.getOneArtist(id),
        albums: this.albumService.getAlbumsByArtist(id),
        songs: this.songService.getSongsByArtist(id),
      }).subscribe({
        next: (results) => {
            this.artistToDisplay = results.artist;
            console.log('Artist retrieved: ', results.artist);
            this.songsToDisplay = results.songs;
            console.log('Songs retrieved: ', results.songs);
            this.albumsToDisplay = results.albums;
            console.log('Albums retrieved: ', results.albums);
            this.isLoading = false;
            this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading artist:', err);
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

  deleteAlbum(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          this.albumsToDisplay = this.albumsToDisplay.filter(album => album._id !== id);
        }
      })
    }
  }

  deleteArtist(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.artistService.deleteArtist(id).subscribe({
        next: () => {
          alert('Artist deleted');
          this.router.navigate(['/view-all-artists']);
        }
      })
    }
  }
}
