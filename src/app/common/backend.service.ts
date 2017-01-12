import { Injectable, Type } from '@angular/core';
import { Identifiable } from './common.interfaces';

@Injectable()
export abstract class BackendService {

  public getAll: <T extends Identifiable>(type: Type<T>) => Promise<T[]>;

  public abstract get<T extends Identifiable>(type: Type<T>, id: number): Promise<T>;

  public abstract add<T extends Identifiable>(type: Type<T>, item: T): Promise<T>;

  public abstract edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T>;

  public abstract delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<T>;

}
