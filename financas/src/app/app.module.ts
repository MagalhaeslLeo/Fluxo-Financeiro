import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { User } from './core/user';
import { Utils } from './core/utils';
import { ServiceBase } from './core/serviceBase';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule
  
  ],
  providers: [

    User,
    Utils,
    ServiceBase,
    { provide: MatDialogRef, useValue: {} },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
