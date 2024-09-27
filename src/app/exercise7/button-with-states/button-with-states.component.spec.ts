import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithStatesComponent } from './button-with-states.component';

describe('ButtonWithStatesComponent', () => {
  let component: ButtonWithStatesComponent;
  let fixture: ComponentFixture<ButtonWithStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonWithStatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWithStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
