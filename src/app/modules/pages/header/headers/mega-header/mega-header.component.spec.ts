import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaHeaderComponent } from './mega-header.component';

describe('MegaHeaderComponent', () => {
  let component: MegaHeaderComponent;
  let fixture: ComponentFixture<MegaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
