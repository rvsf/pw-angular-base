import { Injectable } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ICourse, Course } from './course.model';
import { ITheme } from '../manage-themes/theme.model';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private static COURSE_KEY = 'course';

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth) {
  }

  public get(): Observable<Array<ICourse>> {
    return this.angularAuth.user
      .pipe(takeUntil(this.unsubscribe),
        switchMap(user => {
          return this.af.collection<ICourse>(CourseService.COURSE_KEY).valueChanges();
        }));
  }

  public getById(courseId: string): Observable<ICourse> {
    return this.af.collection<ICourse>(CourseService.COURSE_KEY).doc(courseId).valueChanges();
  }

  public async create(course: ICourse): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    course.id = this.af.createId();
    course.themes.forEach(themes=>{
      themes.id=this.af.createId()

    })
     const x = await this.af.collection(CourseService.COURSE_KEY).doc(course.id).set(course);
     await this.af.collection(CourseService.COURSE_KEY).doc(course.id).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});

     return x
  }

  public async update(course: ICourse): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    course.themes.forEach(theme=>theme.id?'':theme.id=this.af.createId())
    const x =await this.af.collection(CourseService.COURSE_KEY).doc(course.id).set(course);
    await this.af.collection(CourseService.COURSE_KEY).doc(course.id).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});

    debugger;
    return x

  }

  public async delete(courseId: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(CourseService.COURSE_KEY).doc(courseId).delete();
  }
  public getByTimeStamp(ThemeId: string): Promise<any> {
    return this.af.firestore.collection(CourseService.COURSE_KEY).orderBy("timestamp",'desc',).limit(5).get().then(querySnapshot=>{
       return querySnapshot.docChanges();;
    })

 }
}
