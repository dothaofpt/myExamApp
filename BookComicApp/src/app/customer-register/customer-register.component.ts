import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  customer: Customer = {
    fullName: '',
    phoneNumber: '',
    registrationDate: new Date()
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  registerCustomer(): void {
    this.customerService.registerCustomer(this.customer).subscribe(() => {
      this.router.navigate(['/comic-books']); // Redirect to book list after registration
    });
  }
}
