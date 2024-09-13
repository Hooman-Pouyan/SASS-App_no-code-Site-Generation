import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme18Component } from './base-theme18.component';

describe('BaseTheme18Component', () => {
  let component: BaseTheme18Component;
  let fixture: ComponentFixture<BaseTheme18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme18Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
