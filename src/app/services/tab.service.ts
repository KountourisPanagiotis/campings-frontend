import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Service for switching the ovehead Tabs for menu selection :)
@Injectable({
  providedIn: 'root'
})
export class TabService {
  tabSwitcher = new Subject<number>();

  switchTab(index: number) {
    this.tabSwitcher.next(index);
  }
}
