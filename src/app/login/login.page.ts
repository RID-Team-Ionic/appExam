import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( public menuCtrl: MenuController, private navCtrl: NavController ) { }

  // [ Disable SideMenu Template on LoginPage ]
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  openSignup() {
    this.navCtrl.navigateForward('/signup');
  }

}
