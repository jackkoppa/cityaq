import { Primitive } from '../base-request.model';

export interface BaseMapsRequest {
    [key: string]: Primitive | Primitive[]
}