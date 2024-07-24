import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
  IonButton,
  IonIcon, IonFabButton, IonFab, IonFabList, IonModal } from '@ionic/angular/standalone';
import { ChatsPageMock } from 'src/mocks/chatsPageMock';
import { ChatsWrapperComponent } from '../chats-wrapper/chats-wrapper.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, chatbubbleEllipsesOutline, createOutline, ellipsisVerticalOutline, personAddOutline, searchOutline } from 'ionicons/icons';
import { ActionSheetController } from '@ionic/angular';
import { ModalContactChildComponent } from '../modal-contact-child/modal-contact-child.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonModal, IonFabList, IonFab, IonFabButton, 
    IonIcon,
    IonButton,
    IonPopover,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonThumbnail,
    ChatsWrapperComponent,
    ModalContactChildComponent
  ],
})
export class ChatsPage implements OnInit {
  public chats = ChatsPageMock;

  constructor(private router: Router, private actionSheetCtr: ActionSheetController) {
    addIcons({ searchOutline, ellipsisVerticalOutline , add, createOutline, chatbubbleEllipsesOutline, personAddOutline});
  }

  public presentingElement: any | HTMLElement = undefined
  private canDismissOverride = false;


  ngOnInit() {
    this.presentingElement = document.getElementById('.ion-page');
  }

  openProfille() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main']);
  }

  onDismissChange(canDismiss: boolean) {
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    this.canDismissOverride = false;
  }

  canDismiss = async () => {
    if (this.canDismissOverride) {
      // Checks for the override flag to return early if we can dismiss the overlay immediately
      return true;
    }

    const actionSheet = await this.actionSheetCtr.create({
      header: '¿Seguro que deseas salir?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  goToNewChat(){
    this.router.navigate(['/new-chat']);
  }
  
}
