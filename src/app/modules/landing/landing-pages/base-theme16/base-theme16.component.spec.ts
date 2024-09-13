import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme16Component } from './base-theme16.component';

describe('BaseTheme16Component', () => {
  let component: BaseTheme16Component;
  let fixture: ComponentFixture<BaseTheme16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme16Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
