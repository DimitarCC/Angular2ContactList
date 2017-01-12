import { Identifiable } from '../common/common.interfaces';
export class Contact implements Identifiable {
    constructor(public id: number,
                public firstName: string,
                public lastName: string,
                public gender: Gender,
                public email: string,
                public phone: string,
                public address: string) { }
}

export enum Gender {
    MALE = 1,
    FEMALE = 2,
}
