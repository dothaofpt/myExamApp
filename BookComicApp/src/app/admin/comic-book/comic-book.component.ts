
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComicBook } from '../../shared/models/comic-book';
import { ComicBookService } from '../../shared/services/comic-book.service';

@Component({
  selector: 'app-comic-book',
  templateUrl: './comic-book.component.html',
  styleUrls: ['./comic-book.component.css']
})
export class ComicBookComponent implements OnInit {
  comicBooks: ComicBook[] = [];
  isModalVisible = false;
  selectedComicBook: ComicBook = new ComicBook();

  constructor(
    private comicBookService: ComicBookService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadComicBooks();
  }

  loadComicBooks(): void {
    this.comicBookService.getComicBooks().subscribe((data: ComicBook[]) => {
      this.comicBooks = data;
    });
  }

  openAddModal(): void {
    this.selectedComicBook = new ComicBook();
    this.isModalVisible = true;
  }

  openEditModal(comicBook: ComicBook): void {
    this.selectedComicBook = { ...comicBook };
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveComicBook(): void {
    if (this.selectedComicBook.Title && this.selectedComicBook.Author && this.selectedComicBook.PricePerDay) {
      if (this.selectedComicBook.ComicBookID) {
        this.comicBookService.updateComicBook(this.selectedComicBook).subscribe(() => {
          this.loadComicBooks();
          this.closeModal();
        });
      } else {
        this.comicBookService.addComicBook(this.selectedComicBook).subscribe(() => {
          this.loadComicBooks();
          this.closeModal();
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }

  deleteComicBook(comicBookID: number): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa sách truyện này?',
      nzOnOk: () => {
        this.comicBookService.deleteComicBook(comicBookID).subscribe(() => {
          this.loadComicBooks();
        });
      }
    });
  }
}
