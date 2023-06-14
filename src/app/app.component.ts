import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TabService } from './services/tab.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'campings-frontend';
  cf = 'coding-factory';
  name = '';

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  private tabSwitcherSub!: Subscription;

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.tabSwitcherSub = this.tabService.tabSwitcher.subscribe(index => {
      this.tabGroup.selectedIndex = index;
    });
  }

  ngOnDestroy() {
    if(this.tabSwitcherSub) { // additional check for null/undefined value
      this.tabSwitcherSub.unsubscribe(); // Prevent memory leaks
    }
  }
}
