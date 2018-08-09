import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';

import { StaticMapsRequest } from './static-maps-request.model';

@Injectable()
export class StaticMapsApi {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) {}

    public getImage(request?: StaticMapsRequest): Observable<File> {
        return this.http
            .get(
                environment.mapsApiUrl + 'staticmap?' + this.apiService.buildMapsQueryString(request),
                { responseType: 'blob' }
            )
            .pipe(map(res => <File>res));
    }
}
