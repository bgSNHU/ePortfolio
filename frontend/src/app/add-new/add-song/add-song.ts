import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist-model';
import { forkJoin } from 'rxjs';
import { NgZone } from '@angular/core';
import { Album } from '../../models/album-model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-add-song',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css',
})
export class AddSong implements OnInit{

  // Create & initialize class variables
  addSongForm: FormGroup = new FormGroup({});
  songArtistDropdown: Artist[] = [];
  songAlbumDropdown: Album[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  // Instantiate services & imports
  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private songService: SongService,
    private artistService: ArtistService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {

    // Create form for new Song entry
    this.addSongForm = this.formBuilder.group({
      songTitle: ['', Validators.required],
      songArtist: ['', Validators.required],
      songReleaseDate: [''],
      songAlbum: [''],
      songTime: ['']
    });

    // forkJoin gets albums and artists concurrently
    forkJoin({
      albums: this.albumService.getAllAlbums(),
      artists: this.artistService.getAllArtists()
    }).subscribe ({               // Subscribe needed to get info from service file calls
      next: (results) => {
        this.ngZone.run(() => {
          this.songAlbumDropdown = results.albums;
          this.songArtistDropdown = results.artists;
          this.cdr.detectChanges();
        });
      }, error: (err) => {
        console.error('Error loading data: ', err);
      }
    })
  }

  // Passes new song info to backend controller
  onSubmit() {
    if (this.addSongForm.valid) {
      this.songService.addNewSong(this.addSongForm.value).subscribe({
        next: () => {
            console.log('Song added successfully.')
            alert('Song added successfully!');
            this.router.navigate(['/view-all-songs']);
        }, error: (err) => {
          console.error('Error adding song: ', err);
        }
      });
    }
  }
}
