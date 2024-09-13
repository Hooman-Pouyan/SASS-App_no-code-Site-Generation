import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme12Component } from './base-theme12.component';

describe('BaseTheme12Component', () => {
  let component: BaseTheme12Component;
  let fixture: ComponentFixture<BaseTheme12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
