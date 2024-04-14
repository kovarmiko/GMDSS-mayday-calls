import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarComponent } from './radar.component';
import { MessageService } from '../core/services/message.service';
import { WebSocketFactoryService } from '../core/services/websocket-factory.service';
import { MockWebSocketFactoryService } from '../../testing/mocks/MockWebSocketFactoryService';

describe('RadarComponent', () => {
  let component: RadarComponent;
  let fixture: ComponentFixture<RadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadarComponent],
      providers: [MessageService, {provide: WebSocketFactoryService, useClass: MockWebSocketFactoryService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
