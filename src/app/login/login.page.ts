import { AuthService } from './../auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor( public menuCtrl: MenuController,
          private navCtrl: NavController,
          private storage: Storage,
          private authService: AuthService ) {
    // [ Disable SideMenu Template on LoginPage ]
    this.menuCtrl.enable(false);

    this.authService.checkCode('loginPage');
  }

  ngOnInit() {
  }

  openLoginto() {
    this.navCtrl.navigateForward('/loginto');
  }

  openSignup() {
    this.navCtrl.navigateForward('/signup');
  }
}
