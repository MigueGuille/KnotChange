import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonList,
  IonCheckbox,
  IonNote,
  IonModal,
  CheckboxCustomEvent,
  IonItem,
  IonIcon,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { FetchesService } from '../fetches.service';
import { ToastService } from '../toast.service';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-contact',
  templateUrl: './modal-contact-child.component.html',
  styleUrls: ['./modal-contact-child.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonIcon,
    IonItem,
    IonNote,
    IonCheckbox,
    IonList,
    IonContent,
    IonButtons,
    IonButton,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonModal,
    FormsModule,
  ],
})
export class ModalContactChildComponent implements OnInit {
  @Input() modal!: IonModal;
  @Output() dismissChange = new EventEmitter<boolean>();
  public isValid = false;

  public userName = '';
  public urlImage =
    'https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png';

  public inputData = {
    value: '',
    contactName: '',
  };

  checkboxChanged(event: any) {
    const ev = event as CheckboxCustomEvent;
    const checked = ev.detail.checked;

    this.dismissChange.emit(checked);
  }

  constructor(
    private fetcheService: FetchesService,
    private toastService: ToastService,
    private loading: LoadingService,
    private router: Router
  ) {
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {}

  async searchUser(event: any) {
    try {
      const name = event.target.value;

      this.loading.showLoading();
      const result = (await this.fetcheService.verifyUserExist(name)) as any;
      this.isValid = result ? true : false;

      if (!result) {
        this.toastService.showToast({
          message: 'Usuario no encontrado',
          duration: 2000,
        });
        return;
      }

      this.userName = result.userName;
      this.urlImage = result.image;
    } catch (error) {
      this.toastService.showToast({
        message: 'Error al buscar usuario',
        type: 'danger',
      });
    } finally {
      this.loading.hideLoading();
    }
  }

  async addContact() {
    try {
      if (!this.userName || !this.inputData.contactName) return;

      this.loading.showLoading();
      const resultAdd = (await this.fetcheService.addContact({
        userOrEmail: this.userName,
        nameContact: this.inputData.contactName,
      })) as any;

      console.log(resultAdd);

      if (!resultAdd || resultAdd.error) {
        this.toastService.showToast({
          message: resultAdd.error.message || 'Error al agregar contacto',
          type: 'danger',
        });

        return;
      }

      this.toastService.showToast({
        message: 'Contacto agregado',
        duration: 2000,
        type: 'success',
      });

      this.router.navigate(['/chats']);
    } catch (error) {
      this.toastService.showToast({
        message: 'Error al agregar contacto',
        type: 'danger',
      });
    } finally {
      this.loading.hideLoading();
      this.dismissChange.emit(true);
    }
  }
}
