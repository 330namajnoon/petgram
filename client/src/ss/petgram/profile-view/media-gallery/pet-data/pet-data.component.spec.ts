import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDataComponent } from './pet-data.component';

describe('PetDataComponent', () => {
  let component: PetDataComponent;
  let fixture: ComponentFixture<PetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
