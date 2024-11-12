import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:5199/api/rentals';

  constructor(private http: HttpClient) {}

  createRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.apiUrl, rental);
  }

  addRentalDetails(rentalDetail: RentalDetail): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/details`, rentalDetail);
  }

  getRentalsByDateRange(startDate: string, endDate: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/report?startDate=${startDate}&endDate=${endDate}`);
  }
}
