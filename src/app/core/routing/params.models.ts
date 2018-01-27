import { Params } from '@angular/router';

export interface QueryParams extends Params {
    cities: string;
}

export interface ObjectParams {
    cityNames: string[];
}