import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCreateComponent } from './rental-create.component';

describe('RentalCreateComponent', () => {
  let component: RentalCreateComponent;
  let fixture: ComponentFixture<RentalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
