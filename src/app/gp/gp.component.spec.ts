import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GPComponent } from './gp.component';

describe('GPComponent', () => {
  let component: GPComponent;
  let fixture: ComponentFixture<GPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
