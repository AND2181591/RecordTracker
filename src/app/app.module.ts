import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav/nav-item/nav-item.component';

import { ModalComponent } from './shared/modal/modal.component';
import { ModalEditComponent } from './shared/modal-edit/modal-edit.component';
import { ModalGenericComponent } from './shared/modal-generic/modal-generic.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule, 
    MaterialModule, 
    FlexLayoutModule, 
    AppRoutingModule, 
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [ModalComponent, ModalEditComponent, ModalGenericComponent]
})
export class AppModule { }
