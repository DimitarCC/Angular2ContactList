import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { ContactsModule } from './contacts/contacts.module';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    AlertModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeModule,
    ContactsModule,
  ],
  declarations: [AppComponent, AppNavComponent],
  exports: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
