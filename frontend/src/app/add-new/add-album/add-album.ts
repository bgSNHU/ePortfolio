import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { Artist } from '../../models/artist-model';
import { forkJoin } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-add-album',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-album.html',
  styleUrl: './add-album.css',
})

export class AddAlbum implements OnInit{

  // Create and initialize class variables
  addAlbumForm: FormGroup = new FormGroup({});
  albumSongsDropdown: Song[] = [];
  albumArtistDropdown: Artist[] = [];

  // Instantiate services & imports
  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private songService: SongService,
    private artistService: ArtistService,
    private ngZone: NgZone,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {

    // Creates form for new album entry
    this.addAlbumForm = this.formBuilder.group({
      albumName: ['', Validators.required],
      albumArtist: ['', Validators.required],
      albumReleaseDate: [''],
      albumGenre: [''],
      albumSongs: ['']
    });

    // forkJoin gets songs and artists concurrently
    forkJoin({
      songs: this.songService.getAllSongs(),
      artists: this.artistService.getAllArtists()
    }).subscribe ({           // Subscribe needed to retrieve data from service files
      next: (results) => {
        this.ngZone.run(() => {
          this.albumSongsDropdown = results.songs;
          this.albumArtistDropdown = results.artists;
        });
      }, error: (err) => {
        console.error('Error loading artists and songs: ', err);
      }
    })
  }

  // Passes form data to backend controller to create a new Album
  onSubmit() {
    if (this.addAlbumForm.valid) {
      this.albumService.addNewAlbum(this.addAlbumForm.value).subscribe({
        next: () => {
          alert('Album added successfully!');           // Confirms successful processing
          this.router.navigate(['/view-all-albums']);   // Returns to page to view all albums
        }, error: (err) => {
          console.error('Error adding album: ', err);
        }
      });
    }
  }
};
