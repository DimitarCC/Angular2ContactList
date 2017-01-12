import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { Contact } from '../contacts/contact.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BackendHttpService implements BackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    @Inject('API_BASE_URL') private baseUrl: string,
    private http: Http) { }

  public getAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Contact.name) {
      let err = new Error(`Cannot recognize given type: ${type.name}`);
      return Promise.reject<T[]>(err);
    }
    return this.http.get(this.baseUrl + '/' + collection)
      .map(response => response.json().data as T[])
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  public get<T extends Identifiable>(type: Type<T>, id: number): Promise<T> {
    return this.getAll<T>(type).then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find object of type: ${type.name} with id: ${id}`);
    });
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Contact.name) {
      let err = new Error(`Cannot recognize given type: ${type.name}`);
      return Promise.reject<T>(err);
    }
    return this.http.post(this.baseUrl + '/' + collection, JSON.stringify(item), this.options)
      .map(response => response.json().data as T[])
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Contact.name) {
      let err = new Error(`Cannot recognize given type: ${type.name}`);
      return Promise.reject<T>(err);
    }
    return this.http.put(this.baseUrl + '/' + collection + '/' + item.id, JSON.stringify(item), this.options)
      .map(response => response.json().data as T[])
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  public delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<void> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Contact.name) {
      let err = new Error(`Cannot recognize given type: ${type.name}`);
      return Promise.reject<void>(err);
    }
    return this.http.delete(this.baseUrl + '/' + collection + '/' + itemId)
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  private handleErrorObservable(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
