import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRequestListComponent } from './person-request-list.component';

describe('PersonRequestListComponent', () => {
  let component: PersonRequestListComponent;
  let fixture: ComponentFixture<PersonRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
