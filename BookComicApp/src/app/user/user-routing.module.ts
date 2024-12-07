import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RentalComponent } from './rental/rental.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'reports', component: ReportComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
