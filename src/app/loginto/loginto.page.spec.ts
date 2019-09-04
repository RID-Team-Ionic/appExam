import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintoPage } from './loginto.page';

describe('LogintoPage', () => {
  let component: LogintoPage;
  let fixture: ComponentFixture<LogintoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
