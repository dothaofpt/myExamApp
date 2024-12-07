import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalDetail } from '../models/rental-detail';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {
  private apiUrl = 'http://localhost:5199/api/rentaldetails';

  constructor(private http: HttpClient) { }

  getRentalDetails(): Observable<RentalDetail[]> {
    return this.http.get<RentalDetail[]>(this.apiUrl);
  }

  getRentalDetail(id: number): Observable<RentalDetail> {
    return this.http.get<RentalDetail>(`${this.apiUrl}/${id}`);
  }

  addRentalDetail(rentalDetail: RentalDetail): Observable<RentalDetail> {
    return this.http.post<RentalDetail>(this.apiUrl, rentalDetail);
  }

  updateRentalDetail(rentalDetail: RentalDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${rentalDetail.RentalDetailID}`, rentalDetail);
  }

  deleteRentalDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
