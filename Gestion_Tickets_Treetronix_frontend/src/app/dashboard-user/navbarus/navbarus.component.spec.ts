import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarusComponent } from './navbarus.component';

describe('NavbarusComponent', () => {
  let component: NavbarusComponent;
  let fixture: ComponentFixture<NavbarusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
