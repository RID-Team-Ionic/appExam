import { async } from '@angular/core/testing';
import { FeedBack } from './../models/feedback';
import { AuthService } from './../auth.service';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.page.html',
  styleUrls: ['./userupdate.page.scss'],
})
export class UserupdatePage implements OnInit {
  getCoded: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  feedback: FeedBack;
  updateForm: FormGroup;

  validators_messages = {
    'fullname': [
      {type: 'required', message: ' Fullname is required.'}
    ],
    'username': [
      {type: 'required', message: ' Username is required.'},
      {type: 'pattern', message: ' Please use english language.'}
    ],
    'email': [
      {type: 'required', message: ' E-mail is required.'},
      {type: 'pattern', message: ' Not E-mail.'}
    ]
    ,
    'password': [
    ]
  }

  constructor( private formBuilder: FormBuilder,
          private storage: Storage,
          private navCtrl: NavController,
          private authService: AuthService,
          private alertCtrl: AlertController,
          private loadingCtrl: LoadingController,
          ) {
    this.authService.checkCode('coded');
  }

  ngOnInit() {
    // Reactive Forms Validation.
    this.updateForm = this.formBuilder.group({
      fullname: ['', [
        Validators.required
        ]
      ],
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
        ]
      ],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
        ]
      ]
      ,
      password: ['', [
      ]]
    });
    
    this.showUpdateAccountForm();
  }

  goBack() {
    this.navCtrl.navigateBack('home');
  }

  showUpdateAccountForm() {
    this.authService.checkCode('coded').then(val => {
      // Send getCoded to Validate JWT in auth.service validate()
      this.getCoded = val;
      // console.log(this.getCoded);
      this.authService.validate(this.getCoded);
      // .Subscribe is complete callback
      this.authService.validate(this.getCoded).subscribe(
        async (feedback: FeedBack) => {
          this.feedback = feedback; // Get FeedBack from (Backend)
          if (this.feedback.message === 'Access granted.' ) {
            this.fullname = this.feedback.data.fullname;
            this.username = this.feedback.data.username;
            this.email = this.feedback.data.email;
          } else {
          }
        },
        async (error) => {
          console.log(error);
        },
        async () => {

        }
      );
    });
  }

  async update(form: any) {
    const fullname = form.fullname;
    const username = form.username;
    const email = form.email;
    const password = form.password;
    const getCoded = this.getCoded;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Loading ...'
    });
    await loading.present();
    
    // Use Service AuthService and Update Method
    this.authService.update(fullname, username, email, password, getCoded).subscribe(
      async (feedback: FeedBack) => {
        this.feedback = feedback; // Get FeedBack from (Backend)

        if (this.feedback.message === 'User was updated.') {
          const alert = await this.alertCtrl.create({
            message: this.feedback.message,
            buttons: [{
              text: 'OK',
              handler: () => {
                // Set JWT
                this.storage.ready().then(() => { // ถ้า Platform พร้อมใช้งาน
                  this.storage.set('code', this.feedback.jwt);
                  // console.log( this.feedback.jwt );
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
