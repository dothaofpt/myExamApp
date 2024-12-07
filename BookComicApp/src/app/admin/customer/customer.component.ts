
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from '../../shared/models/customer';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  isModalVisible = false;
  selectedCustomer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  openAddModal(): void {
    this.selectedCustomer = new Customer();
    this.isModalVisible = true;
  }

  openEditModal(customer: Customer): void {
    this.selectedCustomer = { ...customer };
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveCustomer(): void {
    if (this.selectedCustomer.FullName && this.selectedCustomer.PhoneNumber) {
      if (this.selectedCustomer.CustomerID) {
        this.customerService.updateCustomer(this.selectedCustomer).subscribe(() => {
          this.loadCustomers();
          this.closeModal();
        });
      } else {
        this.customerService.addCustomer(this.selectedCustomer).subscribe(() => {
          this.loadCustomers();
          this.closeModal();
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }

  deleteCustomer(customerID: number): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa khách hàng này?',
      nzOnOk: () => {
        this.customerService.deleteCustomer(customerID).subscribe(() => {
          this.loadCustomers();
        });
      }
    });
  }
}
