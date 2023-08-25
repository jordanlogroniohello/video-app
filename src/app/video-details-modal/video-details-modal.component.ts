import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-details-modal',
  templateUrl: './video-details-modal.component.html',
  styleUrls: ['./video-details-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule],
})
export class VideoDetailsModalComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {console.log(data);};

	joinGenreTexts(genres: any[]): string {

	  if(!genres){
	  	return 'N/A';
	  }
	  return genres.map(genre => genre.text).join(', ');
	}

}
