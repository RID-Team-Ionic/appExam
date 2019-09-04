import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // [ Example json service ]
  // apiUrl = 'https://codingthailand.com/api/get_courses.php';
  apiUrl = 'http://localhost/@work/examIonic/appExam/ionic4api/api/get_courses.php';

  constructor(private http: HttpClient) { }

  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

}
