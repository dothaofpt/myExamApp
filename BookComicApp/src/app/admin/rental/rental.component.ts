
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Rental } from '../../shared/models/rental';
import { RentalService } from '../../shared/services/rental.service';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from '../../shared/models/customer';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  customers: Customer[] = [];
  isModalVisible = false;
  selectedRental: Rental = new Rental();

  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadRentals();
    this.loadCustomers();
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

  openAddModal(): void {
    this.selectedRental = new Rental();
    this.isModalVisible = true;
  }

  openEditModal(rental: Rental): void {
    this.selectedRental = { ...rental };
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveRental(): void {
    if (this.selectedRental.CustomerID && this.selectedRental.RentalDate && this.selectedRental.ReturnDate) {
      if (this.selectedRental.RentalID) {
        this.rentalService.updateRental(this.selectedRental).subscribe(() => {
          this.loadRentals();
          this.closeModal();
        });
      } else {
        this.rentalService.addRental(this.selectedRental).subscribe(() => {
          this.loadRentals();
          this.closeModal();
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
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
