import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Artist } from '../../models/artist-model';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Album } from '../../models/album-model';
import { AlbumService } from '../../services/album.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-edit-song',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-song.html',
  styleUrl: './edit-song.css',
})
export class EditSong implements OnInit{

  editSongForm: FormGroup = new FormGroup({});
  artistsToDisplay: Artist[] = [];
  songToDisplay: Song | null = null;
  albumsToDisplay: Album[] = [];

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      this.editSongForm = this.formBuilder.group({
        songTitle: ['', Validators.required],
        songArtist: ['', Validators.required],
        songReleaseDate: [''],
        songAlbum: [''],
        songTime: ['']
      });

      if (id) {
        forkJoin ({
          song: this.songService.getOneSong(id),
          artists: this.artistService.getAllArtists(),
          albums: this.albumService.getAllAlbums()
        }).subscribe({
          next: (results) => {
            this.songToDisplay = results.song;
            this.artistsToDisplay = results.artists;
            this.albumsToDisplay = results.albums;
            this.cdr.detectChanges();

            this.editSongForm.patchValue({
              songTitle: results.song.songTitle,
              songArtist: typeof results.song.songArtist === 'object'
              ? (results.song.songArtist as any)._id: results.song.songArtist,
              songReleaseDate: results.song.songReleaseDate
              ? new Date(results.song.songReleaseDate).toISOString().split('T')[0]
              : '',
              songAlbum: typeof results.song.songAlbum === 'object'
              ? (results.song.songAlbum as any)._id
              : results.song.songAlbum,
              songTime: results. song.songTime
            })
          }
        })
      }
  }

  onSubmit() {
    if (this.editSongForm.valid && this.songToDisplay !== null) {
      console.log('onSubmit triggered');
      this.songService.updateSong(this.songToDisplay._id, this.editSongForm.value).subscribe({
        next: () => {
          alert('Song updated sucessfully');
          this.router.navigate(['/view-all-songs']);
        }, error: (err) => {
          console.error('Error updating song', err);
        }
      });
    } else {
      console.log('Exited at if statement in onSubmit()');
    }
  }

  deleteSong(id: string): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          alert('Song deleted');
          this.router.navigate(['/view-all-songs']);
        }
      })
    }
  }
}
