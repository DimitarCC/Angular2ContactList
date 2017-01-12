import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BackendMockService } from '../common/backend-mock.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts.component.html',
  styleUrls: ['./../app.component.css'],
  providers: [BackendMockService]
})
export class ContactsComponent implements OnInit {
    public contacts: Contact[] = [];
  public selectedId: number;

  constructor(private service: BackendMockService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {};

  public ngOnInit() {

    // refresh products
    this.fetchContacts();

    // highlight previously selected product
    this.route.params
      // .do(params => console.log(JSON.stringify(params)))
      .forEach((params: Params) => {
        this.selectedId = +params['selectedId'];
      });
  }

  public selectItem(contact: Contact): void {
    this.selectedId = contact.id;
    this.router.navigate(['.', { selectedId: contact.id }], { replaceUrl: true })
      .then(isSucces => this.router.navigate(['/contact', contact.id]));
  }

  public deleteItem(id: number) : void {
    this.service.delete(Contact, id).then(() => {
      this.fetchContacts();
    });
  }

  private fetchContacts() {
    this.service.getAll(Contact).then((contactElements) => {
      this.contacts = contactElements;
    });
  }
}
