import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Song } from '../../models/song-model';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-song-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './song-detail.html',
  styleUrl: './song-detail.css',
})
export class SongDetail implements OnInit{
  
  songToDisplay: Song | null = null;
  isLoading: boolean = true;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {   
        this.songService.getOneSong(id).subscribe({
        next: (song) => {
            this.songToDisplay = song;
            this.isLoading = false;
            this.cdr.detectChanges();
            console.log(song);
      },
      error: (err) => {
        console.error('Error loading song:', err);
        this.isLoading = false;
      }
    });
    }
  }

  deleteSong(id: string | undefined): void {
    if(!id) return;
    if (this.confirmDialogService.confirmDelete()) {
      this.songService.deleteSong(id).subscribe({
        next: () => {
          alert('Song successfully deleted');
          this.router.navigate(['/view-all-songs']);
        }
      })
    }
  }
}
