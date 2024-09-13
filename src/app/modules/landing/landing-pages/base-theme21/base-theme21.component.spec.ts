import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme21Component } from './base-theme21.component';

describe('BaseTheme21Component', () => {
  let component: BaseTheme21Component;
  let fixture: ComponentFixture<BaseTheme21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme21Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
