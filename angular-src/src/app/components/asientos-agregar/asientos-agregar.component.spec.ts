import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosAgregarComponent } from './asientos-agregar.component';

describe('AsientosAgregarComponent', () => {
  let component: AsientosAgregarComponent;
  let fixture: ComponentFixture<AsientosAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsientosAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
