import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicBookComponent } from './comic-book/comic-book.component';
import { CustomerComponent } from './customer/customer.component';
import { RentalComponent } from './rental/rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

const routes: Routes = [
  { path: 'comic-books', component: ComicBookComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'rental-details', component: RentalDetailComponent },
  { path: '', redirectTo: 'comic-books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
