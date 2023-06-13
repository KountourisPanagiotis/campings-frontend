import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingComponent } from './camping.component';

describe('CampingComponent', () => {
  let component: CampingComponent;
  let fixture: ComponentFixture<CampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
