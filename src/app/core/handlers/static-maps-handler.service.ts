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
        request.center = latitude.toString() + ',' + (longitude + this.latOffset(latitude, longitude)).toString();
        request.markers += '|' + latitude.toString() + ',' + longitude.toString();
        request.key = environment.staticMapsKey;
        return this.staticMapsApi.getImage(request);        
    }

    private latOffset(latitude: number, longitude: number): number {
        if (!environment.randomizedMapsLongitude) return 0;

        const latDecimal = Math.ceil(latitude) - latitude;
        const longDecimal = Math.ceil(longitude) - longitude;

        return LONG_OFFSET + ((latDecimal >= 0.5 ? -1 : 1) * longDecimal * LONG_OFFSET)

        // removing fully randomized center points, in favor of location-generated "randomization"
        // location-generated means that each location will always have its same, unique center point; 
        // much better for caching each image
        // return LONG_OFFSET + ((Math.random() >= 0.5 ? -1 : 1) * Math.random() * LONG_OFFSET);
    }
}