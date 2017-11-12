import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { ApiService } from '../../api.service';
import { StaticMapsRequest } from './static-maps-request.model';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaticMapsApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getImage(request?: StaticMapsRequest): Observable<File> {
        return this.http
            .get(
                environment.mapsApiUrl + 'staticmap?' + this.apiService.buildBaseQueryString(request)
            )
            .map(res => <File>res.blob());
    }
}