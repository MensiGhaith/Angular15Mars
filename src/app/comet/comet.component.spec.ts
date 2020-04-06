import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometComponent } from './comet.component';

describe('CometComponent', () => {
  let component: CometComponent;
  let fixture: ComponentFixture<CometComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
