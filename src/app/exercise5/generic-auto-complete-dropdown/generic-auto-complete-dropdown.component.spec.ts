import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAutoCompleteDropdownComponent } from './generic-auto-complete-dropdown.component';

describe('GenericAutoCompleteDropdownComponent', () => {
  let component: GenericAutoCompleteDropdownComponent;
  let fixture: ComponentFixture<GenericAutoCompleteDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericAutoCompleteDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAutoCompleteDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
