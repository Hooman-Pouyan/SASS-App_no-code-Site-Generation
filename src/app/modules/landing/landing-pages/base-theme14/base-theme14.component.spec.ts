import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme14Component } from './base-theme14.component';

describe('BaseTheme14Component', () => {
  let component: BaseTheme14Component;
  let fixture: ComponentFixture<BaseTheme14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
