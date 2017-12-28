import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAdSpaceComponent } from './left-ad-space.component';

describe('LeftAdSpaceComponent', () => {
  let component: LeftAdSpaceComponent;
  let fixture: ComponentFixture<LeftAdSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftAdSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftAdSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
