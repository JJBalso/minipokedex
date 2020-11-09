import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinipokedexComponent } from './minipokedex.component';

describe('MinipokedexComponent', () => {
  let component: MinipokedexComponent;
  let fixture: ComponentFixture<MinipokedexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinipokedexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinipokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
