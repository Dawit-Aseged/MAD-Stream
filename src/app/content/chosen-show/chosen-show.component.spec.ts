import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenShowComponent } from './chosen-show.component';

describe('ChosenShowComponent', () => {
  let component: ChosenShowComponent;
  let fixture: ComponentFixture<ChosenShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
