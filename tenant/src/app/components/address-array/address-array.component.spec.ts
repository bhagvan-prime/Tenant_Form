import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressArrayComponent } from './address-array.component';

describe('AddressArrayComponent', () => {
  let component: AddressArrayComponent;
  let fixture: ComponentFixture<AddressArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
