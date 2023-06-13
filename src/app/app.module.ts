import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CampingComponent } from './components/camping/camping.component';

const routes: Routes = [
	{ path: 'camping', component: CampingComponent },
  // { path: '', component: WelcomeComponent },
	// { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CampingComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
