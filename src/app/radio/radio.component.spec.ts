import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { MessageService } from '../core/services/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketFactoryService } from '../core/services/websocket-factory.service';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        MessageService,
        {provide: WebSocketFactoryService, useClass: WebSocketFactoryService!}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class FakeMessageService {

}
