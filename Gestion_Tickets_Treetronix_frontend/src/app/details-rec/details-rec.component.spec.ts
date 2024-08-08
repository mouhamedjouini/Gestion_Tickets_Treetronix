import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecComponent } from './details-rec.component';

describe('DetailsRecComponent', () => {
  let component: DetailsRecComponent;
  let fixture: ComponentFixture<DetailsRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
