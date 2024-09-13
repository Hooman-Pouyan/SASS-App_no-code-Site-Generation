import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme11Component } from './base-theme11.component';

describe('BaseTheme11Component', () => {
  let component: BaseTheme11Component;
  let fixture: ComponentFixture<BaseTheme11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
