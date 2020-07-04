import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ProjectModule } from './project/project.module';
import { EducationModule } from './education/education.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UniversityModule } from './university/university.module';

const firebaseConfig = {
  apiKey: "AIzaSyAGzP9zeMUGgg3q98-v-y5Ji2iZPdlz5jA",
  authDomain: "linkedinpw.firebaseapp.com",
  databaseURL: "https://linkedinpw.firebaseio.com",
  projectId: "linkedinpw",
  storageBucket: "linkedinpw.appspot.com",
  messagingSenderId: "755011464935",
  appId: "1:755011464935:web:34b7f6c21bf13d29e27c42",
  measurementId: "G-LYBYPWRZ8D"
};

@NgModule({
  declarations: [
    FooterComponent,
    MainComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ProjectModule,
    EducationModule,
    UniversityModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
