import { Customer } from './customer';

export class Rental {
  RentalID: number = 0;
  CustomerID: number = 0;
  RentalDate: Date = new Date();
  ReturnDate: Date = new Date();
  Status: string = '';
  Customer: Customer = new Customer();
}
