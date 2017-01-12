import { Injectable } from '@angular/core';
import { Contact, Gender } from './contact.model';
import { BackendMockService } from '../common/backend-mock.service';

@Injectable()
export class ContactsService {
    constructor(private backend: BackendMockService) { }

    public getAllContacts(): Promise<Contact[]> {
        return this.backend.getAll(Contact);
    }

    public getContact(id: number): Promise<Contact> {
    return this.backend.get(Contact, id);
  }

  public addContact(contact: Contact): Promise<Contact> {
    return this.backend.add(Contact, contact);
  }

  public editContact(contact: Contact): Promise<Contact> {
    return this.backend.edit(Contact, contact);
  }

  public deleteContact(contactId: number): Promise<Contact> {
    return this.backend.delete(Contact, contactId);
  }

}
