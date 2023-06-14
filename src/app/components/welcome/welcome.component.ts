import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private tabService: TabService) { }

  navigateToBookNow() {
    this.tabService.switchTab(1); // Switch to Booking tab
  }
}
