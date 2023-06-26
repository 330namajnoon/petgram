import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorysComponent } from './storys.component';

describe('StorysComponent', () => {
  let component: StorysComponent;
  let fixture: ComponentFixture<StorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
