import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme17Component } from './base-theme17.component';

describe('BaseTheme17Component', () => {
  let component: BaseTheme17Component;
  let fixture: ComponentFixture<BaseTheme17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme17Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
