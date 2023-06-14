import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  navigateToBookNow() {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = 1;
    }
  }
}
