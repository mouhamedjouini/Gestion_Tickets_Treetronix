import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecComponent } from './list-rec.component';

describe('ListRecComponent', () => {
  let component: ListRecComponent;
  let fixture: ComponentFixture<ListRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
