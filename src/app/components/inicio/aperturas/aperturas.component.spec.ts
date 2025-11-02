import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturasComponent } from './aperturas.component';

describe('AperturasComponent', () => {
  let component: AperturasComponent;
  let fixture: ComponentFixture<AperturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
