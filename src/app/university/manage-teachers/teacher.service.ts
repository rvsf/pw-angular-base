import { Injectable } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ITeacher } from './teacher.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private static TEACHER_KEY = 'teacher';

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth) {
  }

  public get(): Observable<Array<ITeacher>> {
    return this.angularAuth.user
      .pipe(takeUntil(this.unsubscribe),
        switchMap(user => {
          return this.af.collection<ITeacher>(TeacherService.TEACHER_KEY).valueChanges();
        }));
  }

  public getById(teacherId: string): Observable<ITeacher> {
    return this.af.collection<ITeacher>(TeacherService.TEACHER_KEY).doc(teacherId).valueChanges();
  }

  public async create(teacher: ITeacher): Promise<string> {
    const currentUser = firebase.auth().currentUser;
    teacher.id = this.af.createId();
    console.log(teacher)
    const x=  await this.af.collection(TeacherService.TEACHER_KEY).doc(teacher.id).set(teacher);
    await this.af.collection(TeacherService.TEACHER_KEY).doc(teacher.id).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
    return teacher.id;

  }

  public async update(teacher: ITeacher): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    const x=  await this.af.collection(TeacherService.TEACHER_KEY).doc(teacher.id).set(teacher);

    await this.af.collection(TeacherService.TEACHER_KEY).doc(teacher.id).update({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
    return x
  }

  public async delete(teacherId: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(TeacherService.TEACHER_KEY).doc(teacherId).delete();
  }
  public getByTimeStamp(): Promise<any> {
    return this.af.firestore.collection(TeacherService.TEACHER_KEY).orderBy("timestamp",'desc',).limit(5).get().then(x=>{
      const courses:ITeacher[]=[]
      x.docs.forEach((result)=>{
        courses.push(result.data())
     })
    return courses})
  }
}
