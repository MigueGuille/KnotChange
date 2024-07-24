import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast: any;

  constructor(private toastController: ToastController) {}

  async showToast({
    message,
    duration = 1500,
    type = 'success',
  }: {
    message: string;
    duration?: number;
    type?: string;
  }) {
    const cssClass = type === 'success' ? 'toast-success' : 'toast-danger';

    this.toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: type,
      cssClass: cssClass,
    });

    await this.toast.present();
  }

  async hideToast() {
    if (this.toast) {
      await this.toast.dismiss();
      this.toast = null;
    }
  }
}
