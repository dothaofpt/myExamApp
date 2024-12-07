import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Rental } from '../../shared/models/rental';
import { RentalDetail } from '../../shared/models/rental-detail';
import { RentalService } from '../../shared/services/rental.service';
import { RentalDetailService } from '../../shared/services/rental-detail.service';
import { CustomerService } from '../../shared/services/customer.service';
import { ComicBookService } from '../../shared/services/comic-book.service';
import { Customer } from '../../shared/models/customer';
import { ComicBook } from '../../shared/models/comic-book';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  customers: Customer[] = [];
  comicBooks: ComicBook[] = [];
  rentalDetails: RentalDetail[] = [];
  isModalVisible = false;
  selectedRental: Rental = new Rental();
  selectedRentalDetail: RentalDetail = new RentalDetail();

  constructor(
    private rentalService: RentalService,
    private rentalDetailService: RentalDetailService,
    private customerService: CustomerService,
    private comicBookService: ComicBookService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadRentals();
    this.loadCustomers();
    this.loadComicBooks();
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe((data: Rental[]) => {
      this.rentals = data;
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  loadComicBooks(): void {
    this.comicBookService.getComicBooks().subscribe((data: ComicBook[]) => {
      this.comicBooks = data;
    });
  }

  openAddModal(): void {
    this.selectedRental = new Rental();
    this.selectedRentalDetail = new RentalDetail();
    this.isModalVisible = true;
  }

  openEditModal(rental: Rental): void {
    this.selectedRental = { ...rental };
    this.selectedRentalDetail = rental.RentalDetail;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveRental(): void {
    if (this.selectedRental.CustomerID && this.selectedRental.RentalDate && this.selectedRental.ReturnDate && this.selectedRentalDetail.ComicBookID && this.selectedRentalDetail.Quantity && this.selectedRentalDetail.PricePerDay) {
      if (this.selectedRental.RentalID) {
        this.rentalService.updateRental(this.selectedRental).subscribe(() => {
          this.rentalDetailService.updateRentalDetail(this.selectedRentalDetail).subscribe(() => {
            this.loadRentals();
            this.closeModal();
          });
        });
      } else {
        this.rentalService.addRental(this.selectedRental).subscribe((rental: Rental) => {
          this.selectedRentalDetail.RentalID = rental.RentalID;
          this.rentalDetailService.addRentalDetail(this.selectedRentalDetail).subscribe(() => {
            this.loadRentals();
            this.closeModal();
          });
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }

  deleteRental(rentalID: number): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa đơn thuê này?',
      nzOnOk: () => {
        this.rentalService.deleteRental(rentalID).subscribe(() => {
          this.loadRentals();
        });
      }
    });
  }
}

