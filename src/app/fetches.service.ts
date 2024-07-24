import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { finalize, firstValueFrom } from 'rxjs';
import { URL_REQUEST } from './constants';

@Injectable({
  providedIn: 'root',
})
export class FetchesService {
  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  sendLoginRequest({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) {
    this.loadingService.showLoading('Iniciando sesion');

    return firstValueFrom(
      this.httpClient.post(URL_REQUEST.LOGIN, { userName, password }).pipe(
        finalize(() => {
          this.loadingService.hideLoading();
        })
      )
    );
  }

  obtainChats(page = 1, loading = true) {
    const token = localStorage.getItem('token');

    if (loading) this.loadingService.showLoading('Obteniendo chats');

    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.CHATS}/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            if (loading) this.loadingService.hideLoading();
          })
        )
    );
  }

  addMessage({
    idReceiver,
    typeMessage,
    messageString,
  }: {
    idReceiver: string;
    typeMessage: typeMessage;
    messageString: string;
  }) {
    const token = localStorage.getItem('token');
    const bodySend = {
      idReceiver,
      content: {
        type: typeMessage,
        message: messageString,
      },
    };

    return firstValueFrom(
      this.httpClient.post(URL_REQUEST.ADD_MESSAGE, bodySend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  obtainMessagesByChatId({
    idChat,
    page = 1,
  }: {
    idChat: string;
    page?: number;
  }) {
    const token = localStorage.getItem('token');

    this.loadingService.showLoading('Cargando mensajes');
    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.GET_MESSAGES_CHAT}/${idChat}/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  obtainUserInfo(idUser: string) {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.GET_USER_INFO}/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  createChat(idUserReceiver: string, twoChats = true) {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient
        .post(
          URL_REQUEST.CREATE_CHAT,
          { idUserReceiver, twoChats },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  verifyChatExist(idUserReceiver: string) {
    const token = localStorage.getItem('token');
    // this.loadingService.showLoading('Cargando chat');

    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.VERIFY_CHAT}/${idUserReceiver}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            // this.loadingService.hideLoading();
          })
        )
    );
  }

  obtainContacts(page = 1) {
    const token = localStorage.getItem('token');

    this.loadingService.showLoading('Obteniendo contactos');

    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.GET_CONTACTS}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  verifyUserExist(userNameOrEmail: string) {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient
        .get(`${URL_REQUEST.USER_EXIST}/${userNameOrEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            // this.loadingService.hideLoading();
          })
        )
    );
  }

  addContact({
    userOrEmail,
    nameContact,
  }: {
    userOrEmail: string;
    nameContact: string;
  }) {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient.post(
        URL_REQUEST.ADD_CONTACT,
        { userOrEmail, nameContact },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  }

  obtainAllContactsStatus() {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient
        .get(URL_REQUEST.GET_CONTACTS_STATUS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
          })
        )
    );
  }

  addStatus({ description, image }: { description: String; image: String }) {
    const token = localStorage.getItem('token');

    this.loadingService.showLoading('Agregando estado');
    return firstValueFrom(
      this.httpClient
        .post(
          URL_REQUEST.ADD_STATUS,
          { description, image },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  deleteStatus(idStatus: string) {
    const token = localStorage.getItem('token');

    this.loadingService.showLoading('Eliminando estado');
    return firstValueFrom(
      this.httpClient
        .delete(`${URL_REQUEST.DELETE_STATUS}/${idStatus}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
            this.loadingService.hideLoading();
          })
        )
    );
  }

  obtainMyStatuses() {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient
        .get(URL_REQUEST.GET_MY_STATUS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          finalize(() => {
          })
        )
    );
  }
}

type typeMessage = 'text' | 'image' | 'audio';
