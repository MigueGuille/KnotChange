import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'chats',
    redirectTo: '/tabs/chats',
    pathMatch: 'full',
  },
  {
    path: 'chat/:idUser/:idChat',
    loadComponent: () => import('./chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: 'new-chat',
    loadComponent: () =>
      import('./new-chat/new-chat.page').then((m) => m.NewChatPage),
  },
  {
    path: 'statuses',
    redirectTo: '/tabs/statuses',
    pathMatch: 'full',
  },
  {
    path: 'new-status',
    loadComponent: () => import('./new-status/new-status.page').then( m => m.NewStatusPage)
  },
];
