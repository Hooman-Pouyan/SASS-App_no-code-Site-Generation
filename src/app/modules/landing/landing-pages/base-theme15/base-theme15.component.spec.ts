import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme15Component } from './base-theme15.component';

describe('BaseTheme15Component', () => {
  let component: BaseTheme15Component;
  let fixture: ComponentFixture<BaseTheme15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
