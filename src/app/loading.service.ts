import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: any;
  private isLoadingShown = false;
  private loadingPromise: Promise<void> | null = null;

  constructor(private loadingController: LoadingController) {}

  async showLoading(message: string = 'Loading...') {
    this.loadingPromise = new Promise(async (resolve) => {
      this.loading = await this.loadingController.create({
        message: message,
        spinner: 'crescent',
        cssClass: 'custom-loading',
      });

      await this.loading.present();
      this.isLoadingShown = true;
      resolve();
    });

    await this.loadingPromise;
    this.loadingPromise = null; // Reset the promise after it's resolved
  }

  async hideLoading() {
    if (this.loadingPromise) {
      await this.loadingPromise; // Ensure showLoading has finished
    }

    if (this.loading && this.isLoadingShown) {
      await this.loading.dismiss();
      this.loading = null;
      this.isLoadingShown = false;
    }
  }
}