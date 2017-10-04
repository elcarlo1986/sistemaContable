import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosFiltrarComponent } from './asientos-filtrar.component';

describe('AsientosFiltrarComponent', () => {
  let component: AsientosFiltrarComponent;
  let fixture: ComponentFixture<AsientosFiltrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsientosFiltrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosFiltrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
