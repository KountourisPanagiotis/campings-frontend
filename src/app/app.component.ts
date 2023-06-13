import { Component } from '@angular/core';
import { SideBar } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campings-frontend';
  cf = 'coding-factory';
  name = '';

  sideBarMenu: SideBar[] = [
    {text: 'Camping',path: 'camping'},
    // {text: 'welcome',path: 'camping'},
    // {text: 'Make a Booking',path: 'camping'},
    // {text: 'about us',path: 'camping'},
  ]
}
