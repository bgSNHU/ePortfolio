import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Artist } from '../../models/artist-model';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-edit-artist',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-artist.html',
  styleUrl: './edit-artist.css',
})
export class EditArtist implements OnInit{

  editArtistForm: FormGroup = new FormGroup({});
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
    private router: Router,
    private formBuilder: FormBuilder,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.editArtistForm = this.formBuilder.group({
      artistName: ['', Validators.required],
      artistBirthday: [''],
      artistSongs: [[]],
      artistAlbums: [[]],
    });

    if (id) {
      forkJoin ({   
        artist: this.artistService.getOneArtist(id),
        albums: this.albumService.getAlbumsByArtist(id),
        songs: this.songService.getSongsByArtist(id),
      }).subscribe({
        next: (results) => {
            this.artistToDisplay = results.artist;
            this.songsToDisplay = results.songs;
            this.albumsToDisplay = results.albums;
            this.isLoading = false;
            this.cdr.detectChanges();

            this.editArtistForm.patchValue({
              artistName: results.artist.artistName,
              artistBirthday: results.artist.artistBirthday
              ? new Date(results.artist.artistBirthday).toISOString().split('T')[0]
              : '',
              artistSongs: Array.isArray(results.songs)         // Pre-selects songs in dropdown
            ? results.songs.map((song: any) =>
            typeof song === 'object' ? song._id : song
          ) : [],
              artistAlbums: results.albums
            })
      },
      error: (err) => {
        console.error('Error loading artist:', err);
        this.isLoading = false;
      }
    });
    }
  }

  onSubmit() {
    if (this.editArtistForm.valid) {
      this.artistService.updateArtist(this.artistToDisplay?._id, this.editArtistForm.value).subscribe({
        next: () => {
          alert('Artist updated successfully!');
          this.router.navigate(['/view-all-artists']);
        }, error: (err) => {
          console.error('Error updating artist: ', err);
        }
      });
    } else {
      console.error('Error updating artist: ');
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