import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';

// DatePipe for dates transformations
import { DatePipe } from '@angular/common';

// Optimize speed of big tables with VirtualScroll. renders items in view only.
import { ScrollingModule } from '@angular/cdk/scrolling';

// Services for Http
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './services/customers/customers.service';
import { EmplacementService } from './services/emplacement/emplacement.service';
import { BookingService } from './services/booking/booking.service';
import { CampingsService } from './services/campings/campings.service';
import { PaymentService } from './services/payment/payment.service';
import { SpotrentalService } from './services/spotrental/spotrental.service';
import { ClientTransactionService } from './services/client-transaction/client-transaction.service';

// Service for my base Url
import { MyBaseUrlService } from './services/my-base-url/my-base-url.service';

// Popup Module
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { CampingComponent } from './components/camping/camping.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './components/booking/booking.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { CustomersComponent } from './components/customers/customers.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffService } from './services/staff/staff.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category/category.service';
import { PaymentComponent } from './components/payment/payment.component';
import { EmplacementComponent } from './components/emplacement/emplacement.component';

const routes: Routes = [
	{ path: 'camping', component: CampingComponent },
  { path: 'booking', component: BookingComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CampingComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    BookingComponent,
    AboutMeComponent,
    CustomersComponent,
    StatisticsComponent,
    StaffComponent,
    CategoryComponent,
    PaymentComponent,
    EmplacementComponent,

  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule, // Add HttpClientModule
    RouterModule.forRoot(routes), // My routing
    BrowserAnimationsModule, // Installed auto by Material Angular
    MatTabsModule, // Material Angular
    MatSnackBarModule, // Material Angular Popup
    ScrollingModule, // Optimize speed of big tables with VirtualScroll. renders items in view only.

  ],
  providers: [
    // Services for Http TODO import and include all services in the providers
    CustomersService,
    MyBaseUrlService,
    StaffService,
    CategoryService,
    EmplacementService,
    BookingService,
    CampingsService,
    PaymentService,
    SpotrentalService,
    ClientTransactionService,
    DatePipe,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
