import { Injectable } from '@angular/core';
import { Primitive, BaseRequest } from './base-request.model';
import { BaseOpenAQRequest } from './openaq/base-openaq-request.model';

@Injectable()
export class ApiService {
    public buildBaseQueryString(request: BaseRequest): string {
        return this.setBaseQueryArray(request).join('&')
    }

    public buildOpenAQQueryString(request: BaseOpenAQRequest): string {
        let queryArray: string[] = this.setBaseQueryArray(request);
        Object.keys(request).forEach(key => {
            if (Array.isArray(request[key]))
                (<Primitive[]>request[key]).forEach(arrayProp => queryArray.push(this.encode(key + '[]', arrayProp)));            
        });
        return queryArray.join('&');
    }

    private encode(key: string, val: Primitive): string {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val.toString())
    }

    private setBaseQueryArray(request: BaseRequest | BaseOpenAQRequest): string[] {
        let queryArray: string[] = [];
        Object.keys(request).forEach(key => {
            if (!Array.isArray(request[key])) queryArray.push(this.encode(key, <Primitive>request[key]));
        });
        return queryArray;
    }
}