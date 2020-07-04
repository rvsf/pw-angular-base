import { Injectable } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ITheme } from './theme.model';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private static THEME_KEY = 'Theme';

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth) {
  }

  public get(): Observable<Array<ITheme>> {
    return this.angularAuth.user
      .pipe(takeUntil(this.unsubscribe),
        switchMap(user => {
          return this.af.collection<ITheme>(ThemeService.THEME_KEY).valueChanges();
        }));
  }

  public getById(ThemeId: string): Observable<ITheme> {
    return this.af.collection<ITheme>(ThemeService.THEME_KEY).doc(ThemeId).valueChanges();
  }

  public async create(Theme: ITheme): Promise<void> {
    const currentUser = firebase.auth().currentUser;

    return await this.af.collection(ThemeService.THEME_KEY).doc(Theme.id).set({
    id:Theme.id,
    description:Theme.description,
    maxHours:Theme.maxHours,
    practice:Theme.practice,
    title:Theme.title,

    })

      }

  public async update(Theme: ITheme): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(ThemeService.THEME_KEY).doc(Theme.id).set(Theme);
  }

  public async delete(ThemeId: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    return await this.af.collection(ThemeService.THEME_KEY).doc(ThemeId).delete();
  }



}
