import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { ToastService } from '../toast.service';
import { FetchesService } from '../fetches.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonInputPasswordToggle,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  public loginData: LoginDataInterface = {
    userName: '',
    password: '',
  };

  constructor(
    private toastService: ToastService,
    private fetchesServices: FetchesService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('token')) {
      await this.toastService.showToast({
        message: 'Tienes una sesión activa',
        type: 'success',
        duration: 400,
      });
      this.router.navigate(['/tabs']);
    }
  }

  private setToken = (token: string) => localStorage.setItem('token', token);
  private setUserId = (userId: string) => localStorage.setItem('userId', userId);

  async login() {
    try {
      if (!this.validateLoginData()) return;

      const resultLogin = (await this.fetchesServices.sendLoginRequest(
        this.loginData
      )) as any;

      const token = resultLogin.token.split('Bearer ')[1];

      this.setToken(token);

      this.setUserId(resultLogin.idUser)

      await this.toastService.showToast({
        message: 'Inicio de sesión exitoso',
        type: 'success',
        duration: 400,
      });

      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error(error);
      this.toastService.showToast({
        message: 'Error al iniciar sesión',
        type: 'danger',
      });
    } finally {
      this.loadingService.hideLoading();
    }
  }

  validateLoginData() {
    const userNamePattern = /^[a-zA-Z0-9]{4,12}$/;
    const passwordPattern = /^[A-Za-z\d/.@$!%*#?&]{6,20}$/;

    if (!this.loginData.userName || !this.loginData.password) {
      this.toastService.showToast({
        message: 'Por favor, complete los campos',
        type: 'danger',
      });
      return false;
    }

    if (!userNamePattern.test(this.loginData.userName)) {
      this.toastService.showToast({
        message:
          'El nombre de usuario debe tener entre 4 y 12 caracteres alfanuméricos',
        type: 'danger',
      });
      return false;
    }

    if (!passwordPattern.test(this.loginData.password)) {
      this.toastService.showToast({
        message:
          'La contraseña debe tener entre 6 y 20 caracteres y puede incluir letras, números y los caracteres especiales .@$!%*#?&',
        type: 'danger',
      });
      return false;
    }

    return true;
  }
}

interface LoginDataInterface {
  userName: string;
  password: string;
}
