import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { Album } from '../../models/album-model';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-artist.html',
  styleUrl: './add-artist.css',
})
export class AddArtist implements OnInit {
  
  addArtistForm: FormGroup = new FormGroup({});
  artistSongsDropdown: Song[] = [];
  artistAlbumsDropdown: Album[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private songService: SongService,
    private artistService: ArtistService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.addArtistForm = this.formBuilder.group({
      artistName: ['', Validators.required],
      artistBirthday: [''],
      artistSongs: [[]],
      artistAlbums: [[]],
    });

    forkJoin({
      songs: this.songService.getAllSongs(),
      albums: this.albumService.getAllAlbums()
    }).subscribe ({
      next: (results) => {
        this.ngZone.run(() => {
          this.artistSongsDropdown = results.songs;
          this.artistAlbumsDropdown = results.albums;
        });
      }, error: (err) => {
        console.error('Error loading artists and songs: ', err);
      }
    })
  }

  onSubmit() {
    if (this.addArtistForm.valid) {
      this.artistService.addNewArtist(this.addArtistForm.value).subscribe({
        next: () => {
          alert('Artist added successfully!');
          this.router.navigate(['/view-all-artists']);
        }, error: (err) => {
          console.error('Error adding artist: ', err);
        }
      });
    } else {
      console.error('Error adding artist: ');
    }
  }
}
