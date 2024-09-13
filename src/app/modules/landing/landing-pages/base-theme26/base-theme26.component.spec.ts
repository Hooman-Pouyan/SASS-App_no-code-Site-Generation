import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme26Component } from './base-theme26.component';

describe('BaseTheme26Component', () => {
  let component: BaseTheme26Component;
  let fixture: ComponentFixture<BaseTheme26Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme26Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme26Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
