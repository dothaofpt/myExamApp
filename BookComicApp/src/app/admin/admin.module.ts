import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AdminRoutingModule } from './admin-routing.module';
import { ComicBookComponent } from './comic-book/comic-book.component';
import { CustomerComponent } from './customer/customer.component';
import { RentalComponent } from './rental/rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

@NgModule({
  declarations: [
    ComicBookComponent,
    CustomerComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
