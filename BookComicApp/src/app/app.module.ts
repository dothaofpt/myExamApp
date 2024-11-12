import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicBookListComponent } from './components/comic-book-list/comic-book-list.component';
import { ComicBookCreateComponent } from './components/comic-book-create/comic-book-create.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalReportComponent } from './rental-report/rental-report.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    ComicBookListComponent,
    ComicBookCreateComponent,
    CustomerRegisterComponent,
    RentalCreateComponent,
    RentalReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
