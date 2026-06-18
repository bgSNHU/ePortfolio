import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist-model';
import { forkJoin } from 'rxjs';
import { NgZone } from '@angular/core';
import { Album } from '../../models/album-model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-song',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css',
})
export class AddSong implements OnInit{
  addSongForm: FormGroup = new FormGroup({});
  songArtistDropdown: Artist[] = [];
  songAlbumDropdown: Album[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private songService: SongService,
    private artistService: ArtistService,
    private ngZone: NgZone,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.addSongForm = this.formBuilder.group({
      songTitle: ['', Validators.required],
      songArtist: ['', Validators.required],
      songReleaseDate: [''],
      songAlbum: [''],
      songTime: ['']
    });

    forkJoin({
      albums: this.albumService.getAllAlbums(),
      artists: this.artistService.getAllArtists()
    }).subscribe ({
      next: (results) => {
        this.ngZone.run(() => {
          this.songAlbumDropdown = results.albums;
          this.songArtistDropdown = results.artists;
        });
      }, error: (err) => {
        console.error('Error loading data: ', err);
      }
    })
  }

  onSubmit() {
    if (this.addSongForm.valid) {
      this.songService.addNewSong(this.addSongForm.value).subscribe({
        next: () => {
          this.notificationService.showSuccess('Song added successfully!');
          setTimeout(() => this.router.navigate(['/view-all-songs']), 3000);
        }, error: (err) => {
          this.notificationService.showError('Error adding song');
          console.error('Error adding song: ', err);
        }
      });
    }
  }
}
