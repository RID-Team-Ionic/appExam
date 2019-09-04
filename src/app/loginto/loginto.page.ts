import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginto',
  templateUrl: './loginto.page.html',
  styleUrls: ['./loginto.page.scss'],
})
export class LogintoPage implements OnInit {
  loginForm: FormGroup;

  validators_messages = {
    'username': [
      {type: 'required', message: ' Username is required.'}
    ],
    'password': [
      {type: 'required', message: ' Password is required.'}
    ]
  }

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder  
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required
        ]
      ],
      password: ['', [
        Validators.required
        ]
      ],
    });
  }

  ngOnInit() {
  }

  openForgot() {
    this.navCtrl.navigateForward('forgot');
  }

  goBack() {
    this.navCtrl.navigateBack('login');
  }

  async login(form: any) {
    const username = form.username;
    const password = form.password;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Loading ...'
    });
    await loading.present();
  }
}
