import { MenuController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(public menuCtrl: MenuController, private navCtrl: NavController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/loginto');
  }
}
