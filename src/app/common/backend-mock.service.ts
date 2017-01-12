import { Injectable, Type } from '@angular/core';
import { Identifiable } from './common.interfaces';
import { Contact, Gender } from '../contacts/contact.model';
import { BackendService } from './backend.service';

const CONTACTS: Identifiable[] = [
    new Contact(1, 'John', 'Smith', Gender.MALE, 'john@abv.bg', '245852', 'st. Tuturutka'),
    new Contact(2, 'Albert', 'Mainhaim', Gender.MALE, 'albert@al.bg', '44444', 'st. Pipitka'),
    new Contact(3, 'Andrea', 'Larson', Gender.FEMALE, 'andrea@mail.bg', '88888', 'st. Dudutka'),
];

@Injectable()
export class BackendMockService implements BackendService {

    public getAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
        return Promise.resolve(CONTACTS);
    }

    public get<T extends Identifiable>(type: Type<T>, id: number): Promise<T> {
        let contact = CONTACTS.find((contact) => {
            return contact.id === id;
        });
        return Promise.resolve(contact);
    }

    public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
        item.id = this.getNextId(CONTACTS);
        CONTACTS.push(item);
        return Promise.resolve(item);
    };

    public edit<T extends Identifiable>(type: Type<T>, item: Contact): Promise<T> {
        let contact = CONTACTS.find((contact) => {
            return contact.id === item.id;
        }) as Contact;

        contact.gender = item.gender;
        contact.firstName = item.firstName;
        contact.lastName = item.lastName;
        contact.email = item.email;
        contact.address = item.address;
        contact.phone = item.phone;
        return Promise.resolve(item);
    };

    public delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<T> {
        let contact = CONTACTS.find((contactItem) => {
            return contactItem.id === itemId;
        }) as Contact;
        let index = CONTACTS.indexOf(contact, 0);
        if (index > -1) {
            CONTACTS.splice(index, 1);
        }
        return Promise.resolve(contact);
    };

    private getNextId(collection: Identifiable[]): number {
    return collection.reduce((prevMaxId, next) =>
      next.id > prevMaxId ? next.id : prevMaxId, 0) + 1;
    }

}