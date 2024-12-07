
import { Component } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { CustomerService } from '../../shared/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newCustomer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  registerCustomer(): void {
    if (this.newCustomer.FullName && this.newCustomer.PhoneNumber) {
      this.newCustomer.Registration = new Date(); // Set registration date to current date
      this.customerService.addCustomer(this.newCustomer).subscribe(() => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/user/rentals']);
      }, error => {
        alert('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.');
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
}
