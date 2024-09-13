import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme24Component } from './base-theme24.component';

describe('BaseTheme24Component', () => {
  let component: BaseTheme24Component;
  let fixture: ComponentFixture<BaseTheme24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
