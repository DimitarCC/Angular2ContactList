import { NgModule }     from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ContactsComponent, ContactDetailComponent],
  exports: [ContactsComponent, ContactDetailComponent]
}) 
export class ContactsModule {
}
