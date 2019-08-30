import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';
import { FeedBack } from './../models/feedback';
import { AuthService } from './../auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  feedback: FeedBack;

  constructor( private loadingCtrl: LoadingController, private alertCtrl: AlertController, private navCtrl: NavController, private authService: AuthService, private formControl: FormControl, private formBuilder: FormBuilder ) {
    
  }

  ngOnInit() {
  }

  async signup(form: any) {

    // Get Data from myForm
    const fullname = form.fullname;
    const username = form.username;
    const email = form.email;
    const password = form.password;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Loading ...'
    });
    await loading.present();

    // Use Service AuthService and Signup Method
    this.authService.signup(fullname, username, email, password).subscribe(
      async (feedback: FeedBack) => {
        this.feedback = feedback; // Get FeedBack from (Backend)

        if (this.feedback.status === 'ok') {
          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: ['OK']
          });
          await alert.present();

          // Go to Login Page
          this.navCtrl.navigateForward('/login');
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
