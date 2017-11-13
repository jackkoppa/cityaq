import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { ApiService } from '../../api.service';
import { StaticMapsRequest } from './static-maps-request.model';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class StaticMapsApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getImage(request?: StaticMapsRequest): Observable<File> {
        return this.http
            .get(
                environment.mapsApiUrl + 'staticmap?' + this.apiService.buildMapsQueryString(request),
                { responseType: ResponseContentType.Blob }
            )
            .map(res => <File>res.blob());
    }
}