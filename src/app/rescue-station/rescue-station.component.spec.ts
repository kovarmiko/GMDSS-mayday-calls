import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueStationComponent } from './rescue-station.component';

describe('RescueStationComponent', () => {
  let component: RescueStationComponent;
  let fixture: ComponentFixture<RescueStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RescueStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RescueStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
