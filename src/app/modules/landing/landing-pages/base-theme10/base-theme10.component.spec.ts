import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme10Component } from './base-theme10.component';

describe('BaseTheme10Component', () => {
  let component: BaseTheme10Component;
  let fixture: ComponentFixture<BaseTheme10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
