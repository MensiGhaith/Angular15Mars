import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatahubComponent } from './datahub.component';

describe('DatahubComponent', () => {
  let component: DatahubComponent;
  let fixture: ComponentFixture<DatahubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatahubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatahubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
