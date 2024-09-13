import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClaimbyuserComponent } from './list-claimbyuser.component';

describe('ListClaimbyuserComponent', () => {
  let component: ListClaimbyuserComponent;
  let fixture: ComponentFixture<ListClaimbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClaimbyuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListClaimbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
