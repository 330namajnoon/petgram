import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorysViewComponent } from './storys-view.component';

describe('StorysViewComponent', () => {
  let component: StorysViewComponent;
  let fixture: ComponentFixture<StorysViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorysViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorysViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
