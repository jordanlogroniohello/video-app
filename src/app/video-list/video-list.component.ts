import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { VideoDetailsModalComponent } from '../video-details-modal/video-details-modal.component';
import { VideoDetailsService } from '../video-details.service';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  movies: any = [];
  moviesRandoms: any = [];
  moviesIntro: any = [];

  constructor(
  	private http: HttpClient,
  	private breakpointObserver: BreakpointObserver,
  	private dialog: MatDialog,
  	private videoDetailsService: VideoDetailsService
  ) {}

  ngOnInit(): void {

    this.videoDetailsService.getVideoDetails('x/upcoming?limit=12&info=base_info&year=2023').subscribe((response: any) => {
      this.movies = response.results;
    });

    this.videoDetailsService.getVideoDetails('random?limit=1&info=base_info&list=top_rated_series_250').subscribe((response: any) => {
      this.moviesIntro = response.results[0];
    });

    this.videoDetailsService.getVideoDetails('random?limit=12&info=base_info&list=top_rated_series_250').subscribe((response: any) => {
      this.moviesRandoms = response.results;
    });
  }

  getImageWidth(): string {

  	//console.log('here');
    if (this.breakpointObserver.isMatched('(max-width: 374px)')) {
      return '100'; // Width for 3 per column
    } else if (this.breakpointObserver.isMatched('(max-width: 767px)')) {
      return '143'; // Width for 4 per column
    }

     return '190'; // Default width for 6 per column
  }

  getImageHeight(): string {
    if (this.breakpointObserver.isMatched('(max-width: 374px)')) {
      return '150'; // Height for 3 per column
    } else if (this.breakpointObserver.isMatched('(max-width: 767px)')) {
      return '208'; // Height for 4 per column
    } 

    return '280'; // Default height for 6 per column
  }

  joinGenreTexts(genres: any[]): string {
		if(!genres){
			return 'N/A';
		}
		return genres.map(genre => genre.text).join(', ');
  }

  openVideoDetailsModal(video: any): void {
  	console.log(video);
    const dialogRef = this.dialog.open(VideoDetailsModalComponent, {
      width: '1000px', // Adjust the width as needed
      data: { video }, // Pass the video data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed', result);
    });
  }

}