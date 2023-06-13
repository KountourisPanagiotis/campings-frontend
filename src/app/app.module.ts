import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule , Route } from '@angular/router';

import { AppComponent } from './app.component';

// const routes: Routes = [
// 	{ path: 'path_to_A', component: AComponent },
// 	{ path: '', component: WelcomeComponent },
// 	{ path: '**', component: PageNotFoundComponent },
// ];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
