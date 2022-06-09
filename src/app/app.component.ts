import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      App.addListener('backButton', ({ canGoBack }) => {
        if (router.url === '/home') {
          App.exitApp();
        } else {
          window.history.back();
        }
      });
    });
  }
}
