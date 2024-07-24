import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { PhotoService } from '../services/photo.service';
import { ToastService } from '../toast.service';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { FetchesService } from '../fetches.service';

@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.page.html',
  styleUrls: ['./new-status.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class NewStatusPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    private toast: ToastService,
    private loading: LoadingService,
    private router: Router,
    private upload: UploadService,
    private fetchService: FetchesService
  ) {}
  public currentImage: any = null;
  public currentImageWeb: any = null;
  public inputDescription: string = '';
  public isReady: boolean = false;

  ngOnInit() {
    this.addPhotoToGallery();
  }

  async addPhotoToGallery() {
    try {
      this.isReady = false;
      this.loading.showLoading('Cargando...');

      const photoBlobOrFile = await this.photoService.addNewToGallery();

      this.currentImageWeb = photoBlobOrFile.webviewPath;

      let photoFile: File;
      if (photoBlobOrFile instanceof Blob) {
        photoFile = new File([photoBlobOrFile], 'photo.jpg', {
          type: photoBlobOrFile.type,
        });
      } else {
        photoFile = photoBlobOrFile as any;
      }

      this.upload.uploadFile(photoFile).subscribe((url) => {
        this.currentImage = url;
        this.isReady = true;
        this.toast.showToast({
          message: 'Foto subida con éxito.',
          type: 'success',
        });
      });

      this.loading.hideLoading();
    } catch (error: any) {
      if (error.message === 'User cancelled photos app') {
        console.log('Selección de foto cancelada por el usuario.');
        this.toast.showToast({
          message: 'Selección de foto cancelada por el usuario.',
          type: 'warning',
        });
      } else {
        console.error(
          'Ocurrió un error al agregar la foto a la galería:',
          error
        );
        this.toast.showToast({
          message: 'Ocurrió un error al agregar la foto a la galería.',
          type: 'danger',
        });
      }
      this.loading.hideLoading();
    }
  }

  async uploadStatus() {
    try {
      const data = {
        image: this.currentImage,
        description: this.inputDescription,
      };

      const result = await this.fetchService.addStatus(data);

      console.log(`Este fue el estado creado ${result}`);
      this.toast.showToast({
        message: 'Estado agregado con éxito.',
        type: 'success',
      });
      this.router.navigate(['/statuses']);
    } catch (error) {
      console.error('Ocurrió un error al agregar el estado:', error);

      this.currentImage = null;
      this.currentImageWeb = null;
      this.inputDescription = '';

      this.toast.showToast({
        message: 'Ocurrió un error al agregar el estado. Intente de nuevo.',
        type: 'danger',
      });
    }
  }

  goToStatus() {
    this.router.navigate(['/statuses']);
  }
}

// async addPhotoToGallery() {
//   try {
//     this.loading.showLoading('Cargando...');
//     const photo = await this.photoService.addNewToGallery();
//     this.currentImage = photo.webviewPath;
//     console.log(this.currentImage);
//   } catch (error: any) {
//     if (error.message === 'User cancelled photos app') {
//       console.log('Selección de foto cancelada por el usuario.');
//       this.toast.showToast({
//         message: 'Selección de foto cancelada por el usuario.',
//         type: 'warning',
//       });
//     } else {
//       // Manejo de otros errores no esperados
//       console.error(
//         'Ocurrió un error al agregar la foto a la galería:',
//         error
//       );
//       this.toast.showToast({
//         message: 'Ocurrió un error al agregar la foto a la galería.',
//         type: 'danger',
//       });
//     }
//   } finally {
//     this.loading.hideLoading();
//   }
// }
