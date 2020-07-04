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

  private static CERTIFICATION_KEY = 'teacher';

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth) {
  }

  public get(): Observable<Array<ITeacher>> {
    return this.angularAuth.user
      .pipe(takeUntil(this.unsubscribe),
        switchMap(user => {
          return this.af.collection<ITeacher>(TeacherService.CERTIFICATION_KEY).valueChanges();
        }));
  }

  public getById(teacherId: string): Observable<ITeacher> {
    return this.af.collection<ITeacher>(TeacherService.CERTIFICATION_KEY).doc(teacherId).valueChanges();
  }

  public async create(teacher: ITeacher): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    teacher.id = this.af.createId();
    return await this.af.collection(TeacherService.CERTIFICATION_KEY).doc(teacher.id).set(teacher);
  }

  public async update(teacher: ITeacher): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(TeacherService.CERTIFICATION_KEY).doc(teacher.id).set(teacher);
  }

  public async delete(teacherId: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(TeacherService.CERTIFICATION_KEY).doc(teacherId).delete();
  }
}
