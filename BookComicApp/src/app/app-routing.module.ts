import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicBookListComponent } from './components/comic-book-list/comic-book-list.component';
import { ComicBookCreateComponent } from './components/comic-book-create/comic-book-create.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalReportComponent } from './rental-report/rental-report.component';

const routes: Routes = [
  { path: 'comic-books', component: ComicBookListComponent },
  { path: 'comic-books/create', component: ComicBookCreateComponent },
  { path: 'customers/register', component: CustomerRegisterComponent },
  { path: 'rentals/create', component: RentalCreateComponent },
  { path: 'rentals/report', component: RentalReportComponent },
  { path: '', redirectTo: '/comic-books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
