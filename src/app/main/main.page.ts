import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonButton, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonImg, IonCol, IonRow, IonButton, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
