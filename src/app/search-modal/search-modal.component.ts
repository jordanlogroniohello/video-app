import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { VideoDetailsService } from '../video-details.service';


@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule],
})
export class SearchModalComponent {
  movies: any = [];	
  searchControl: FormControl = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<SearchModalComponent>,
    private fb: FormBuilder,
    private videoDetailsService: VideoDetailsService
  ) {
    this.searchControl = this.fb.control('');
  }

  onSearch(): void {
    const searchText = this.searchControl.value;
    console.log('Search text:', searchText);

    this.videoDetailsService.getVideoDetails(`search/keyword/${searchText}?limit=50&info=base_info`).subscribe((response: any) => {
      console.log(response);
      this.movies = response.results;
      console.log(this.movies);
    });


    //this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}