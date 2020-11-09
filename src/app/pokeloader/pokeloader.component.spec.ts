import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeloaderComponent } from './pokeloader.component';

describe('PokeloaderComponent', () => {
  let component: PokeloaderComponent;
  let fixture: ComponentFixture<PokeloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
