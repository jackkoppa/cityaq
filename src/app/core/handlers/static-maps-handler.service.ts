import { Injectable } from '@angular/core';
import { StaticMapsApi } from '../api/maps/static-images/static-maps.api';
import { StaticMapsRequest } from '../api/maps/static-images/static-maps-request.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

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

@Injectable()
export class StaticMapsHandlerService {
    constructor(private staticMapsApi: StaticMapsApi) {};

    public getImageByLatLong(latitude: number, longitude: number): Observable<File> {
        const request: StaticMapsRequest = Object.assign({}, DefaultStaticMapsApiRequest);
        const latLong = latitude.toString() + ',' + longitude.toString();
        request.center = latLong;
        request.markers += '|' + latLong;
        request.key = environment.staticMapsKey;
        return this.staticMapsApi.getImage(request);        
    }
}