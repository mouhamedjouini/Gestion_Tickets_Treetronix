import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCovoiturageComponent } from './update-covoiturage.component';

describe('UpdateCovoiturageComponent', () => {
  let component: UpdateCovoiturageComponent;
  let fixture: ComponentFixture<UpdateCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCovoiturageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
