import { Component } from '@angular/core';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/rental';

@Component({
  selector: 'app-rental-report',
  templateUrl: './rental-report.component.html',
  styleUrls: ['./rental-report.component.css']
})
export class RentalReportComponent {
  startDate: string = '';
  endDate: string = '';
  reportData: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  generateReport(): void {
    this.rentalService.getRentalsByDateRange(this.startDate, this.endDate).subscribe(
      (data) => {
        this.reportData = data;
      },
      (error) => {
        console.error('Error generating report', error);
      }
    );
  }
}
