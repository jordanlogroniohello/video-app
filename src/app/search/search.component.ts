import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VideoDetailsService } from '../video-details.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  movies: any = [];	
  searchControl: FormControl = new FormControl('');

  isSearching: boolean = false;

  options: AnimationOptions = {
    path: 'assets/lottie/search.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(
    private fb: FormBuilder,
    private videoDetailsService: VideoDetailsService
  ) {
    this.searchControl = this.fb.control('');
  }

  onSearch() {

  	this.isSearching = true;
    const searchText = this.searchControl.value;
    console.log('Search text:', searchText);

    this.videoDetailsService.getVideoDetails(`search/keyword/${searchText}?limit=10&info=base_info`).subscribe((response: any) => {
      console.log(response);
      this.movies = response.results;
      console.log(this.movies);
      this.isSearching = false;
    });


  }


}