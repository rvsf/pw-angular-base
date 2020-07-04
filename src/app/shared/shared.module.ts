import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { TypeHeadComponent } from './type-head/type-head.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmDialogueComponent, TypeHeadComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgbModule

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    TypeHeadComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LdF5f4UAAAAAI3K-qdcszcg5ZSEAi5JvK9RF1yk' } as RecaptchaSettings,
    },
  ],
  entryComponents: [ConfirmDialogueComponent]
})

export class SharedModule { }
