import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  tabSwitcher = new Subject<number>();

  switchTab(index: number) {
    this.tabSwitcher.next(index);
  }
}
