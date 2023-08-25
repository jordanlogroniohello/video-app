import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs/operators';

const API_KEY = '0b8f89c5a4mshcc009e25f7f49a1p165381jsnc4e731d3cf3e';
const API_URL = 'https://moviesdatabase.p.rapidapi.com/titles';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  constructor(private http: HttpClient) {}

  getVideoDetails(params: string = "") {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', API_KEY)
      .set('X-RapidAPI-Host', 'moviesdatabase.p.rapidapi.com');

    return this.http.get(`${API_URL}/${params}`, { headers }).pipe(delay(2000)); 
  }
}