import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { StaticMapsApi } from '../api/maps/static-images/static-maps.api';
import { StaticMapsRequest } from '../api/maps/static-images/static-maps-request.model';

export const DefaultStaticMapsApiRequest: StaticMapsRequest = {
    center: '',
    zoom: 2,
    size: '550x550',
    key: '',
    scale: 2,
    markers: 'color:black|size:small',
    style: [
        'feature:poi|visibility:off',
        'feature:road|Cvisibility:off',
        'feature:transit|visibility:off',
        'feature:water|color:0xcccccc',
        'feature:landscape|color:0xffffff',
        'feature:administrative|element:labels|visibility:off',
        'feature:administrative.country|element:geometry.stroke|color:0x555555',
        'feature:administrative|element:geometry.fill|visibility:off'
    ]

}

const LONG_OFFSET: number = -30;

@Injectable()
export class StaticMapsHandlerService {
    constructor(private staticMapsApi: StaticMapsApi) {};

    public getImageByLatLong(latitude: number, longitude: number): Observable<File> {
        const request: StaticMapsRequest = Object.assign({}, DefaultStaticMapsApiRequest);
        request.center = latitude.toString() + ',' + (longitude + this.latOffset()).toString();
        request.markers += '|' + latitude.toString() + ',' + longitude.toString();
        request.key = environment.staticMapsKey;
        return this.staticMapsApi.getImage(request);        
    }

    private latOffset(): number {
        if (!environment.randomizedMapsLongitude) return 0;
        return LONG_OFFSET + ((Math.random() >= 0.5 ? -1 : 1) * Math.random() * LONG_OFFSET);
    }
}