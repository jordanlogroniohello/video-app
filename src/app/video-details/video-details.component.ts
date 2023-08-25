import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoDetailsService } from '../video-details.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})


export class VideoDetailsComponent implements OnInit {
  videoId: string | null = null;
  videoDetails: any = {};
  cast: any = [];
  creators: any = [];

  rating: AnimationOptions = {
    path: 'assets/lottie/rating.json',
  };

  upvote: AnimationOptions = {
    path: 'assets/lottie/upvote.json',
  };

  constructor(
    private route: ActivatedRoute,
    private videoDetailsService: VideoDetailsService
  ) {}

	ngOnInit(): void {
	this.route.paramMap.subscribe(params => {
	  this.videoId = params.get('videoId');
	  
	   this.videoDetailsService.getVideoDetails(`${this.videoId}?info=base_info`).subscribe((response: any) => {
	      this.videoDetails = response.results;
	    });

	   this.videoDetailsService.getVideoDetails(`${this.videoId}?info=extendedCast`).subscribe((response: any) => {
	      this.cast = this.joinCastNames(response.results);
	    });

	   this.videoDetailsService.getVideoDetails(`${this.videoId}?info=creators_directors_writers`).subscribe((response: any) => {
	      this.creators = this.joinCreatorsNames(response.results);
	    });


	});
	}

	joinGenreTexts(genres: any[]): string {
		if(!genres){
			return 'N/A';
		}
		return genres.map(genre => genre.text).join(', ');
	}

	joinCastNames(cast: any) {
		if(!cast.cast.edges.length){
			return [];
		}
	  	const castEdges = cast.cast.edges;
	  	const characterNames = castEdges.map((edge: any) => edge.node.name.nameText.text);
	  	return characterNames.join(', ');
	}

	// joinDirectorsNames(data: any) {
	//   const directors = data.results.directors.map((director: any) => director.name.nameText.text);
	//   return directors.join(', ');
	// }

	joinCreatorsNames(data: any) {
		if(!data.creators.length){
			return [];
		}
	    const creators = data.creators[0].credits.map((credit: any) => credit.name.nameText.text);
	    return creators.join(', ');
	}

	// joinWritersNames(data: any) {
	//   const writers = data.results.writers.map((writer: any) => writer.name.nameText.text);
	//   return writers.join(', ');
	// }

}