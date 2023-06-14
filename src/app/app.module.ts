import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { CampingComponent } from './components/camping/camping.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './components/booking/booking.component';
import { AboutMeComponent } from './components/about-me/about-me.component';

const routes: Routes = [
	{ path: 'camping', component: CampingComponent },
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
    
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot(routes), // My routing
    BrowserAnimationsModule, // Installed auto by Material Angular
    MatTabsModule, // Material Angular
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
