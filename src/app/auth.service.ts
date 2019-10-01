// Request => Backend Service
import { MenuController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FeedBack } from './models/feedback';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  coded: string;
  apiUrlCreate = 'http://localhost/appExam/ionic4api/auth/api/create_user.php';
  apiUrlLogin = 'http://localhost/appExam/ionic4api/auth/api/login.php';
  apiUrlValidate = 'http://localhost/appExam/ionic4api/auth/api/validate_token.php';
  apiUrlUpdate = 'http://localhost/appExam/ionic4api/auth/api/update_user.php';

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  // Method Signup รับพารามิเตอร์ และคืนค่า status, message => FeedBack 
  signup(fullname: string, username: string, email: string, password: string): Observable<FeedBack> {
    const header = {'Content-Type': 'application/json'}; // Define header for JSON Send

    // Get Data from signup.page.ts
    // body is Obj
    const body = {
      'fullname': fullname,
      'username': username,
      'email': email,
      'password': password
    };

    // Send Data
    return this.http.post<FeedBack>(this.apiUrlCreate, body, {headers: header});
  }

  login(username: string, password: string): Observable<FeedBack> {
    const header = {'Content-Type': 'application/json'}; // Define header for JSON Send

    // Get Data from login.page.ts
    // body is Obj
    const body = {
      'username': username,
      'password': password
    };

    // Send Data
    return this.http.post<FeedBack>(this.apiUrlLogin, body, {headers: header});
  }

  public checkCode(type: any) {
    if (type == 'loginPage') {
      // Check auth code then logged in
      this.storage.ready().then(() => {
        this.storage.get('code').then((val) => {
          this.coded = val; // Get value in Ionic Storage to coded variable. for use in html page.
          // Check coded empty ? [Ionic Storage]
          if (this.coded != null) {
            location.replace('/home');
          } else {
            this.navCtrl.navigateForward('/login');
          }
        });
      });
    } else if (type == 'coded') {
      // Check auth code then logged in
      return this.storage.ready().then(() => {
        return this.storage.get('code').then((val) => {
          this.coded = val; // Get value in Ionic Storage to coded variable. for use in html page.
          // Check coded empty ? [Ionic Storage]
          if (this.coded != null) {
            return this.coded;
          } else {
            this.navCtrl.navigateForward('/login');
          }
        });
      });
    }
  }

  // Method Validate รับพารามิเตอร์ และคืนค่า message => FeedBack (JWT to verify access)
  validate(c: string): Observable<FeedBack> {
    const header = {'Content-Type': 'application/json'}; // Define header for JSON Send

    // Get getCoded from userupdate.page.ts
    const body = {
      'jwt': c
    };
    // Send Data
    return this.http.post<FeedBack>(this.apiUrlValidate, body, {headers: header});
  }

  update(fullname: string, username: string, email: string, password: string, c: string): Observable<FeedBack> {
    const header = {'Content-Type': 'application/json'}; // Define header for JSON Send

    const body = {
      'fullname': fullname,
      'username': username,
      'email': email,
      'password': password,
      'jwt': c 
    };
    // Send Data
    return this.http.post<FeedBack>(this.apiUrlUpdate, body, {headers: header});
  }
}
