import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme23Component } from './base-theme23.component';

describe('BaseTheme23Component', () => {
  let component: BaseTheme23Component;
  let fixture: ComponentFixture<BaseTheme23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme23Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
