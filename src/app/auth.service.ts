// Request => Backend Service

import { FeedBack } from './models/feedback';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost/appExam/ionic4api/auth/api/create_user.php';

  constructor(private http: HttpClient) { }

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
    return this.http.post<FeedBack>(this.apiUrl, body, {headers: header});
  }
}
