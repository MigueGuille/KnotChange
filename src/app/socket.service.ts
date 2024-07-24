import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket: any;
  public readonly serverUrl = 'http://localhost:9090';
  public outgoingMessages = new Subject<any>();

  constructor(private loadingService: LoadingService) {
    this.connect();
  }

  public connect() {
    
    
    this.socket = io(this.serverUrl, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
      const token = `Bearer ${localStorage.getItem('token')}`;
      this.socket.emit('register', token);
    });

    this.socket.on('registered', (message: string) => {
      console.log(message);
    });

    this.socket.on('error', (errorMessage: string) => {
      console.error('Socket error:', errorMessage);
    });
  }

  sendMessage(receiverId: string, message: string, type = 'text') {
    console.log(`Enviando mensaje a ${receiverId}: ${message}`);
    const senderId = localStorage.getItem('userId');

    const messageObj = {
      sender: senderId,
      receiver: receiverId,
      message: {
        type,
        content: message,
      },
    };

    // Notificar a los observadores sobre el mensaje saliente
    this.outgoingMessages.next(messageObj);

    this.socket.emit('privateMessage', messageObj);
  }

  listenForIncomingMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('privateMessage', (message: any) => {
        observer.next(message);
      });

      // Cuando el observable se destruye, desconectar el listener específico
      return () => this.socket.off('privateMessage');
    });
  }

  listenForOutgoingMessages(): Observable<any> {
    return this.outgoingMessages.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
