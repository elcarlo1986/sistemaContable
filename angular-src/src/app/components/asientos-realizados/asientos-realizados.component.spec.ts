import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosRealizadosComponent } from './asientos-realizados.component';

describe('AsientosRealizadosComponent', () => {
  let component: AsientosRealizadosComponent;
  let fixture: ComponentFixture<AsientosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsientosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
