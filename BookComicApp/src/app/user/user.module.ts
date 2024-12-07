import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { RentalComponent } from './rental/rental.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RentalComponent,
    ReportComponent
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
    UserRoutingModule
  ]
})
export class UserModule { }
