import { Primitive } from '../base-request.model';

export interface BaseOpenAQRequest {
    [key: string]: Primitive | Primitive[]
}