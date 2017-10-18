import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosFechaComponent } from './asientos-fecha.component';

describe('AsientosFechaComponent', () => {
  let component: AsientosFechaComponent;
  let fixture: ComponentFixture<AsientosFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsientosFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
