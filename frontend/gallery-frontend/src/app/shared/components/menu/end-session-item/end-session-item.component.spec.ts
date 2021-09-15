import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSessionItemComponent } from './end-session-item.component';

describe('EndSessionItemComponent', () => {
  let component: EndSessionItemComponent;
  let fixture: ComponentFixture<EndSessionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndSessionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndSessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
