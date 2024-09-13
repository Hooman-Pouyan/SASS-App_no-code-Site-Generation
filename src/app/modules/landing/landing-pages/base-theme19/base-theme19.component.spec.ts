import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme19Component } from './base-theme19.component';

describe('BaseTheme19Component', () => {
  let component: BaseTheme19Component;
  let fixture: ComponentFixture<BaseTheme19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
