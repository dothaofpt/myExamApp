import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComicBook } from '../../models/ComicBook';
import { ComicBookService } from '../../services/comic-book.service';

@Component({
  selector: 'app-comic-book-create',
  templateUrl: './comic-book-create.component.html',
  styleUrls: ['./comic-book-create.component.css']
})
export class ComicBookCreateComponent {
  comicBook: ComicBook = {
    id:0,
    title: '',
    author: '',
    genre: '',
    publicationDate: new Date(),
    price: 0
  };

  constructor(
    private comicBookService: ComicBookService,
    private router: Router
  ) {}

  saveComicBook(): void {
    this.comicBookService.addComicBook(this.comicBook).subscribe(() => {
      this.router.navigate(['/comic-books']);
    });
  }
}
