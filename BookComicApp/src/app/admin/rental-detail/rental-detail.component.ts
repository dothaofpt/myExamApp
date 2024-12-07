
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RentalDetail } from '../../shared/models/rental-detail';
import { RentalDetailService } from '../../shared/services/rental-detail.service';
import { RentalService } from '../../shared/services/rental.service';
import { ComicBookService } from '../../shared/services/comic-book.service';
import { Rental } from '../../shared/models/rental';
import { ComicBook } from '../../shared/models/comic-book';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  rentals: Rental[] = [];
  comicBooks: ComicBook[] = [];
  isModalVisible = false;
  selectedRentalDetail: RentalDetail = new RentalDetail();

  constructor(
    private rentalDetailService: RentalDetailService,
    private rentalService: RentalService,
    private comicBookService: ComicBookService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadRentalDetails();
    this.loadRentals();
    this.loadComicBooks();
  }

  loadRentalDetails(): void {
    this.rentalDetailService.getRentalDetails().subscribe((data: RentalDetail[]) => {
      this.rentalDetails = data;
    });
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe((data: Rental[]) => {
      this.rentals = data;
    });
  }

  loadComicBooks(): void {
    this.comicBookService.getComicBooks().subscribe((data: ComicBook[]) => {
      this.comicBooks = data;
    });
  }

  openAddModal(): void {
    this.selectedRentalDetail = new RentalDetail();
    this.isModalVisible = true;
  }

  openEditModal(rentalDetail: RentalDetail): void {
    this.selectedRentalDetail = { ...rentalDetail };
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveRentalDetail(): void {
    if (this.selectedRentalDetail.RentalID && this.selectedRentalDetail.ComicBookID && this.selectedRentalDetail.Quantity && this.selectedRentalDetail.PricePerDay) {
      if (this.selectedRentalDetail.RentalDetailID) {
        this.rentalDetailService.updateRentalDetail(this.selectedRentalDetail).subscribe(() => {
          this.loadRentalDetails();
          this.closeModal();
        });
      } else {
        this.rentalDetailService.addRentalDetail(this.selectedRentalDetail).subscribe(() => {
          this.loadRentalDetails();
          this.closeModal();
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }

  deleteRentalDetail(rentalDetailID: number): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa chi tiết đơn thuê này?',
      nzOnOk: () => {
        this.rentalDetailService.deleteRentalDetail(rentalDetailID).subscribe(() => {
          this.loadRentalDetails();
        });
      }
    });
  }
}
