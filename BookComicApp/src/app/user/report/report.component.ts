
import { Component, OnInit } from '@angular/core';
import { RentalDetail } from '../../shared/models/rental-detail';
import { RentalDetailService } from '../../shared/services/rental-detail.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private rentalDetailService: RentalDetailService) {}

  ngOnInit(): void {
    this.loadRentalDetails();
  }

  loadRentalDetails(): void {
    this.rentalDetailService.getRentalDetails().subscribe((data: RentalDetail[]) => {
      this.rentalDetails = data;
    });
  }

  filterRentals(): void {
    if (this.startDate && this.endDate) {
      const filteredDetails = this.rentalDetails.filter(detail => {
        const rentalDate = new Date(detail.Rental?.RentalDate || '');
        return rentalDate >= this.startDate && rentalDate <= this.endDate;
      });
      this.rentalDetails = filteredDetails;
    } else {
      alert('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
    }
  }
}
