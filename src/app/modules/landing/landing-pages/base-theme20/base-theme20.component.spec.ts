import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme20Component } from './base-theme20.component';

describe('BaseTheme20Component', () => {
  let component: BaseTheme20Component;
  let fixture: ComponentFixture<BaseTheme20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme20Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
