import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';

// Services for Http
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './services/customers/customers.service';

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

  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, // Add HttpClientModule
    RouterModule.forRoot(routes), // My routing
    BrowserAnimationsModule, // Installed auto by Material Angular
    MatTabsModule, // Material Angular
    MatSnackBarModule, // Material Angular Popup
    
  ],
  providers: [
    // Services for Http
    CustomersService,
    MyBaseUrlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
