import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import {} from 'jasmine';
import { WebSocketFactoryService } from './websocket-factory.service';
import { MockWebSocketFactoryService } from '../../../testing/mocks/MockWebSocketFactoryService';
import { createEmptyMessage } from '../../helpers/helpers';
describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        {
          provide: WebSocketFactoryService,
          useClass: MockWebSocketFactoryService,
        },
      ],
    });

    service = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize WebSocket and handle connections', () => {
    // Arrange
    const spiedWebSocket = spyOn(
      service['webSocketFactory'],
      'makeSocket'
    ).and.callThrough();
    const spiedConnectMethod = spyOn(service, 'connect').and.callThrough();

    // Act
    service.connect('ws://example.com');
    
    // Assert
    expect(spiedConnectMethod).toHaveBeenCalledWith('ws://example.com');
    expect(spiedWebSocket).toHaveBeenCalledWith(
      jasmine.objectContaining({ url: 'ws://example.com' })
    );
    expect(service.socket$).toBeTruthy();
  });

  it('should send message into the observable channel', () => {
    service.connect('ws://example.com');
    if (service.socket$) {
      
      // Arrange
      const message = {
        ...createEmptyMessage(),
        message: 'a test message is being transmitted',
      };
      const socketSpy = spyOn(service.socket$, 'next').and.callThrough();

      // Act
      service.sendMessage(message);

      //Assert
      expect(socketSpy).toHaveBeenCalledOnceWith(message);
    }
  });
});
