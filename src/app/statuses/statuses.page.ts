import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCol,
  IonIcon,
  IonPopover,
  IonItem,
  IonList,
  IonRow,
  IonGrid,
  IonFab,
  IonFabButton,
  IonText,
} from '@ionic/angular/standalone';
import { StatusItemComponent } from '../status-item/status-item.component';
import { contactStatusMock } from 'src/mocks/statusesMocks';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FetchesService } from '../fetches.service';
import { ToastService } from '../toast.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.page.html',
  styleUrls: ['./statuses.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonFabButton,
    IonFab,
    IonGrid,
    IonRow,
    IonList,
    IonItem,
    IonPopover,
    IonIcon,
    IonCol,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    StatusItemComponent,
  ],
})
export class StatusesPage implements OnInit {
  public contactStatus = contactStatusMock;
  public myInfoStatus = {
    contact: {
      id: '',
      name: '',
      image: '',
    },
    status: [
      {
        id: '',
        description: '',
        date: new Date(),
        seen: [],
        image: '',
      },
    ],
  } as any;

  constructor(
    private router: Router,
    private fetchesServices: FetchesService,
    private toast: ToastService,
    private loading: LoadingService
  ) {
    addIcons({ cameraOutline });
  }

  async ngOnInit() {
    this.loadMyStatus();
    await this.loadStatuses();
  }

  goToNewStatus() {
    this.router.navigate(['/new-status']);
  }

  goToNewOrViewStatus() {
    if (this.myInfoStatus.status.length > 0) {
      this.router.navigate(['/view-status']);
    } else {
      this.router.navigate(['/new-status']);
    }
  }

  async loadStatuses() {
    try {
      this.loading.showLoading('Obteniendo estados');

      const newStatuses =
        (await this.fetchesServices.obtainAllContactsStatus()) as any;

      this.contactStatus = newStatuses.data;
      this.loading.hideLoading();
    } catch (error) {
      console.error(error);
      this.toast.showToast({
        message: 'Error al cargar los estados',
        type: 'danger',
      });
      this.loading.hideLoading();
    } finally {
      this.loading.hideLoading();
    }
  }

  async loadMyStatus() {
    try {
      // this.loading.showLoading('Cargando tu estado');
      const newStatus = (await this.fetchesServices.obtainMyStatuses()) as any;
      this.loading.hideLoading();


      this.myInfoStatus = {
        ...newStatus,
        contact: {
          id: newStatus.contact.id,
          name: 'Tú',
          image: newStatus.contact.image,
          userName: newStatus.contact.userName,
        },
      };

    } catch (error) {
      console.error(error);
      this.toast.showToast({
        message: 'Error al cargar tu estado',
        type: 'danger',
      });
      // this.loading.hideLoading();
    } finally {
      // this.loading.hideLoading();
    }
  }
}
