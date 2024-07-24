import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  IonAvatar,
  IonItem,
  IonList,
  IonLabel,
  IonImg,
  IonInput,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { contactsToChatMock } from 'src/mocks/contactsToChatMock';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FetchesService } from '../fetches.service';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';
import { image, searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCard,
    IonBackButton,
    IonButtons,
    IonInput,
    IonImg,
    IonLabel,
    IonList,
    IonItem,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class NewChatPage implements OnInit {
  public contacts: ContactInterface[] = contactsToChatMock;
  private pageContacts = 1;
  public isValidUser = false;
  public searchUser = {
    dataInput: '',
    userName: '',
    idUser: '',
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
  };

  constructor(
    private fetchesService: FetchesService,
    private loadingService: LoadingService,
    private router: Router,
    private toast: ToastService
  ) {
    addIcons({ searchOutline });
  }

  async ngOnInit() {
    try {
      this.contacts =
        (await this.fetchesService.obtainContacts()) as ContactInterface[];
    } catch (error) {
      console.error(error);
    }
  }

  async onIonInfinite(event: any) {
    this.pageContacts++;
    const newContacts = (await this.fetchesService.obtainContacts(
      this.pageContacts
    )) as ContactInterface[];

    if (newContacts.length === 0 || !newContacts) {
      (event as InfiniteScrollCustomEvent).target.disabled = true;
      return;
    }

    this.contacts.push(...newContacts);

    (event as InfiniteScrollCustomEvent).target.complete();
  }

  async obtainDataUserPush(userOrEmail: string) {}

  async clickContact(contact: ContactInterface) {
    //Verificar si ya el chat existe, si existe redirigir,
    await this.loadingService.showLoading('Verificando chat existente');
    const isChat = (await this.fetchesService.verifyChatExist(
      contact.idUserContact
    )) as any;
    await this.loadingService.hideLoading();

    console.log(isChat);

    if (isChat) {
      this.router.navigate(['/chat', contact.idUserContact, isChat.id]);
      return;
    }

    //Si no existe, crear el chat y redirigir
  }

  async searchUserFunction() {
    try {
      this.loadingService.showLoading()
      const userExist = (await this.fetchesService.verifyUserExist(
        this.searchUser.dataInput
      )) as any;

      await this.loadingService.hideLoading()
      if (!userExist) {
        this.isValidUser = false;
        return;
      }

      this.searchUser.userName = userExist.userName;
      this.searchUser.idUser = userExist.id;
      this.searchUser.image = userExist.image;
      this.isValidUser = true;
    } catch (error) {
      console.warn(error);
      this.toast.showToast({
        message: 'Error al buscar usuario',
        type: 'danger',
      });
    }
  }

  async goToChatNoContact() {
    try {
      this.loadingService.showLoading('Creando chat');
      const chatCreated = (await this.fetchesService.createChat(
        this.searchUser.idUser,
        false
      )) as any;
      this.loadingService.hideLoading();


      const { addChatToSender } = chatCreated;

      if (chatCreated) {
        this.router.navigate([
          '/chat',
          addChatToSender.idUserReceiver,
          addChatToSender.id,
        ]);
      }
    } catch (error) {
      this.toast.showToast({ type: 'danger', message: 'Error al crear chat' });
    }

  }
}

interface ContactInterface {
  id: string;
  idUserContact: string;
  idUserOwner: string;
  name: string;
  userContactData: {
    userName: string;
    email: string;
    image: string;
    id: string;
  };
}
