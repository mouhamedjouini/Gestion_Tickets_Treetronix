import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCovoiturageComponent } from './list-covoiturage.component';

describe('ListCovoiturageComponent', () => {
  let component: ListCovoiturageComponent;
  let fixture: ComponentFixture<ListCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCovoiturageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
