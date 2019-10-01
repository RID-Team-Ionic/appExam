import { Storage } from '@ionic/storage';
import { FeedBack } from './../models/feedback';
import { async } from '@angular/core/testing';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginto',
  templateUrl: './loginto.page.html',
  styleUrls: ['./loginto.page.scss'],
})
export class LogintoPage implements OnInit {
  feedback: FeedBack;
  loginForm: FormGroup;

  validators_messages = {
    'username': [
      {type: 'required', message: ' Username is required.'}
    ],
    'password': [
      {type: 'required', message: ' Password is required.'}
    ]
  }

  constructor(public menuCtrl: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private storage: Storage  
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
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

  openForgot() {
    this.navCtrl.navigateForward('/forgot');
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

    // Use Service AuthService and Login Method
    this.authService.login(username, password).subscribe(
      async (feedback: FeedBack) => {
        this.feedback = feedback; // Get FeedBack from (Backend)

        if (this.feedback.status === 'ok' ) {
          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: [{
              text: 'OK',
              handler: () => {
                // Set JWT
                this.storage.ready().then(() => { // ถ้า Platform พร้อมใช้งาน
                  this.storage.set('code', this.feedback.jwt);
                  // Go to Home Page
                  location.replace('/home');
                });
              }
            }]
          });
          await alert.present();
        } else {
          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        console.log(error);
        await loading.dismiss();
      },
      async () => {
        await loading.dismiss();
      }
    );
  }
}
