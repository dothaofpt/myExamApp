import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent {
  rental: Rental = {
    customerId: 0,
    rentalDate: new Date(),
    returnDate: new Date(),
    totalAmount: 0
  };
  rentalDetails: RentalDetail[] = [];
  rentalDetail: RentalDetail = {
    rentalId: 0,
    comicBookId: 0,
    quantity: 1,
    dailyRentalPrice: 0
  };

  constructor(
    private rentalService: RentalService,
    private router: Router
  ) {}

  createRental(): void {
    this.rentalService.createRental(this.rental).subscribe((rental) => {
      this.rentalDetail.rentalId = rental.id!;
      this.rentalService.addRentalDetails(this.rentalDetail).subscribe(() => {
        this.router.navigate(['/comic-books']);
      });
    });
  }
}
