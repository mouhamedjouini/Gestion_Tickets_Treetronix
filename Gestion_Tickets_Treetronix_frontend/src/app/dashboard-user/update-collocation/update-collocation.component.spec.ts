import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollocationComponent } from './update-collocation.component';

describe('UpdateCollocationComponent', () => {
  let component: UpdateCollocationComponent;
  let fixture: ComponentFixture<UpdateCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCollocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
