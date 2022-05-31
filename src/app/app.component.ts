import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Component } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/naming-convention

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      // App.addListener('backButton', ({canGoBack}) => {
      //   if(!canGoBack){
      //     App.exitApp();
      //   } else {
      //     window.history.back();
      //   }
      // });
    });
  }
}
