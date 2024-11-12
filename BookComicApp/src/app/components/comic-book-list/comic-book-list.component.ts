import { Component, OnInit } from '@angular/core';
import { ComicBook } from '../../models/ComicBook';
import { ComicBookService } from '../../services/comic-book.service';

@Component({
  selector: 'app-comic-book-list',
  templateUrl: './comic-book-list.component.html',
  styleUrls: ['./comic-book-list.component.css']
})
export class ComicBookListComponent implements OnInit {
  comicBooks: ComicBook[] = [];

  constructor(private comicBookService: ComicBookService) {}

  ngOnInit(): void {
    this.loadComicBooks();
  }

  loadComicBooks(): void {
    this.comicBookService.getComicBooks().subscribe(
      (data) => {
        this.comicBooks = data;
      },
      (error) => {
        console.error('Error fetching comic books', error);
      }
    );
  }

  deleteComicBook(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      this.comicBookService.deleteComicBook(id).subscribe(() => {
        this.loadComicBooks(); // Reload the list after deletion
      });
    }
  }
}
