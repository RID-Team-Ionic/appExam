import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupdatePage } from './userupdate.page';

describe('UserupdatePage', () => {
  let component: UserupdatePage;
  let fixture: ComponentFixture<UserupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserupdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
