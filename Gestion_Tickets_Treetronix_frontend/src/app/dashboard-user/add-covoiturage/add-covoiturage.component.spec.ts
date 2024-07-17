import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCovoiturageComponent } from './add-covoiturage.component';

describe('AddCovoiturageComponent', () => {
  let component: AddCovoiturageComponent;
  let fixture: ComponentFixture<AddCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCovoiturageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
