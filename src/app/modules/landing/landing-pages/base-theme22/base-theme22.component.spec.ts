import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTheme22Component } from './base-theme22.component';

describe('BaseTheme22Component', () => {
  let component: BaseTheme22Component;
  let fixture: ComponentFixture<BaseTheme22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTheme22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTheme22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
