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
    style: 'feature:poi|visibility:off'
}

@Injectable()
export class StaticMapsHandlerService {
    constructor(private staticMapsApi: StaticMapsApi) {};

    getImageByLatLong(latitude: number, longitude: number): Observable<File> {
        const request: StaticMapsRequest = DefaultStaticMapsApiRequest;
        const latLong = latitude.toString() + ',' + longitude.toString();
        request.center = latLong;
        request.markers += '|' + latLong;
        return this.staticMapsApi.getImage(request);        
    }
}