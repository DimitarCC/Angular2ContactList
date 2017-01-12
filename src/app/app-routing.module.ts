import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

//import { ProductListComponent }  from './products/product-list.component';
//import { UserListComponent }    from './users/user-list.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contacts', component: ContactsComponent },
      {
        path: 'contact/:id',
        component: ContactDetailComponent,
        data: {
          title: 'Edit Contact'
        },
      },
      {
        path: 'contact',
        pathMatch: 'full',
        component: ContactDetailComponent,
        data: {
          title: 'Add New Contact'
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
