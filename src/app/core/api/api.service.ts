import { Injectable } from '@angular/core';

import { Primitive, BaseRequest } from './base-request.model';
import { BaseMapsRequest } from './maps/base-maps-request.model';
import { BaseOpenAQRequest } from './openaq/base-openaq-request.model';

@Injectable()
export class ApiService {
    public buildBaseQueryString(request: BaseRequest): string {
        return this.setBaseQueryArray(request).join('&') || '';
    }

    public buildOpenAQQueryString(request: BaseOpenAQRequest): string {
        return this.buildQueryStringIncludingArrayProps(request, '[]');
    }

    public buildMapsQueryString(request: BaseMapsRequest): string {
        return this.buildQueryStringIncludingArrayProps(request, '');
    }

    private setBaseQueryArray(
        request: BaseRequest | BaseOpenAQRequest | BaseMapsRequest
    ): string[] {
        let queryArray: string[] = [];
        Object.keys(request).forEach(key => {
            if (!Array.isArray(request[key]) && request[key] != null) queryArray.push(this.encode(key, <Primitive>request[key]));
        });
        return queryArray;
    }

    private buildQueryStringIncludingArrayProps(request: BaseOpenAQRequest, arrayAppendedCharacters: string): string {
        const queryArray: string[] = this.setBaseQueryArray(request);
        const chars = arrayAppendedCharacters;
        Object.keys(request).forEach(key => {
            if (Array.isArray(request[key]))
                (<Primitive[]>request[key]).forEach(arrayProp => {
                    if (arrayProp != null) queryArray.push(this.encode(key + chars, arrayProp))
                });            
        });
        return queryArray.join('&') || '';
    }

    private encode(key: string, val: Primitive): string {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val.toString());
    }
}