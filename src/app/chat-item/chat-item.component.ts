import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonModal,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonModal,
    IonItem,
    IonLabel,
    CommonModule,
    IonThumbnail,
  ],
})
export class ChatItemComponent implements OnInit {
  @Input() chat = DefaultChatItem as any;

  public date = new Date(this.chat.lastMessageContent.date);

  getDate() {
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

    const date = this.date.toLocaleDateString('en-US', optionsDate as any);
    const time = this.date.toLocaleTimeString('en-US', optionsTime as any);

    return { date, time };
  }

  public getLastMessage() {
    const { type, content } = this.chat.lastMessageContent.message;
    return type === 'text'
      ? content.length > 20
        ? `${content.substring(0, 20)}...`
        : content
      : '';
  }

  constructor() {}
  ngOnInit() {
    console.log('Este es el mensaje inicial');
  }
}

const DefaultChatItem: ChatItem = {
  idUser: '66880fbf303a3d97891f2f4d',
  idUserReceiver: '66880fbf303a3d97891f2908',
  id: '6696a0dcba1e95a977c83f1b',
  lastMessageContent: {
    idUserSender: '66880fbf303a3d97891f2f4d',
    message: {
      type: 'text',
      content: 'Como estas amigo',
    },
    date: '2024-07-16T21:03:28.308Z',
    read: false,
    id: '6696e0204ce10e26a6ba7eff',
  },
  userLastMessage: {
    userName: 'enmarcm',
    image:
      'https://st2.depositphotos.com/47577860/46269/v/450/depositphotos_462698004-stock-illustration-account-avatar-interface-icon-flat.jpg',
    id: '66880fbf303a3d97891f2f4d',
  },
  userReceiver: {
    userName: 'syragon',
    image:
      'https://st2.depositphotos.com/47577860/46269/v/450/depositphotos_462698004-stock-illustration-account-avatar-interface-icon-flat.jpg',
    id: '66880fbf303a3d97891f2908',
  },
};

interface ChatItem {
  idUser: string;
  idUserReceiver: string;
  id: string;
  lastMessageContent: LastMessageContent;
  userLastMessage: UserLastMessage;
  userReceiver: UserLastMessage;
}

interface UserLastMessage {
  userName: string;
  image: string;
  id: string;
}

interface LastMessageContent {
  idUserSender: string;
  message: Content;
  date: string;
  read: boolean;
  id: string;
}

interface Content {
  type: string;
  content: string;
}
