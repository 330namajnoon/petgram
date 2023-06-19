import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPetComponent } from './data-pet.component';

describe('DataPetComponent', () => {
  let component: DataPetComponent;
  let fixture: ComponentFixture<DataPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
