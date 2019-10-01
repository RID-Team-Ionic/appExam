import { AuthService } from './../auth.service';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { empty } from 'rxjs';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public menuCtrl: MenuController,
        private storage: Storage,
        private navCtrl: NavController,
        private authService: AuthService) {
          
  }

  ngOnInit() {
    this.authService.checkCode('coded');
  }

  openUserupdate() {
    this.navCtrl.navigateForward('/userupdate');
  }

  // Logout
  clearCode() {
    this.storage.remove('code');
    this.navCtrl.navigateBack('login');
  }
}
