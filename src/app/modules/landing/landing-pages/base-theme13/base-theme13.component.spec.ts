import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme13Component } from './base-theme13.component';

describe('BaseTheme13Component', () => {
  let component: BaseTheme13Component;
  let fixture: ComponentFixture<BaseTheme13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
