export const ChatsPageMock: Array<ChatInterface> = [
  {
    idUser: '66880fbf303a3d97891f2f4d',
    idUserReceiver: '66880fbf303a3d97891f2908',
    id: '66974c17a62554245a1b273f',
    lastMessageContent: {
      idUserSender: '66880fbf303a3d97891f2f4d',
      message: {
        type: 'text',
        content: 'Este es otro mensaje',
      },
      date: '2024-07-17T04:54:03.877Z',
      read: false,
      id: '66974e6b00c72a01325614c6',
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
  },
];

interface ChatInterface {
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
