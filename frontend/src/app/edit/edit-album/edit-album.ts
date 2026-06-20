import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { Song } from '../../models/song-model';
import { Artist } from '../../models/artist-model';
import { Album } from '../../models/album-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-album',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-album.html',
  styleUrl: './edit-album.css',
})

export class EditAlbum implements OnInit{
  editAlbumForm: FormGroup = new FormGroup({});
  songsDropdown: Song[] = [];
  artistsDropdown: Artist[] = [];
  albumToDisplay: Album | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private songService: SongService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.editAlbumForm = this.formBuilder.group({
      albumName: ['', Validators.required],
      albumArtist: ['', Validators.required],
      albumReleaseDate: [''],
      albumGenre: [''],
      albumSongs: ['']
    });

    if (id) {
      forkJoin({
        artists: this.artistService.getAllArtists(),
        songs: this.songService.getAllSongs(),
        album: this.albumService.getOneAlbum(id)
      }).subscribe({
        next: (results) => {
          this.albumToDisplay = results.album;
          this.songsDropdown = results.songs;
          this.artistsDropdown = results.artists;
          this.cdr.detectChanges();

          this.editAlbumForm.patchValue({
            albumName: results.album.albumName,
            albumArtist: typeof results.album.albumArtist === 'object'
            ? (results.album.albumArtist as any)._id: results.album.albumArtist,
            albumReleaseDate: results.album.albumReleaseDate
            ? new Date(results.album.albumReleaseDate).toISOString().split('T')[0]
            : '',
            albumGenre: results.album.albumGenre,
            albumSongs: Array.isArray(results.album.albumSongs)
            ? results.album.albumSongs.map((song: any) =>
            typeof song === 'object' ? song._id : song
          ) : []
          })
        }
      })
    }
  }

  onSubmit() {
    if (this.editAlbumForm.valid && this.albumToDisplay !== null) {
      this.albumService.updateAlbum(this.albumToDisplay._id, this.editAlbumForm.value).subscribe({
        next: () => {
          alert('Album updated successfully!');
          this.router.navigate(['/view-all-albums']);
        }, error: (err) => {
          console.error('Error updating album: ', err);
        }
      });
    }
  }
};
