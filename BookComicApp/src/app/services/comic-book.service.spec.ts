import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComicBook } from '../models/ComicBook';

@Injectable({
  providedIn: 'root'
})
export class ComicBookService {
  private apiUrl = 'http://localhost:5199/api/comicbooks';

  constructor(private http: HttpClient) {}

  getComicBooks(): Observable<ComicBook[]> {
    return this.http.get<ComicBook[]>(this.apiUrl);
  }

  createComicBook(comicBook: ComicBook): Observable<ComicBook> {
    return this.http.post<ComicBook>(this.apiUrl, comicBook);
  }

  deleteComicBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
