import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../app.local-constants';
import { HttpClient } from '../core/http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class TechnologiesService {

    constructor(private http:HttpClient) {
        this.http = http;
    }

    fetchTechnologies(): Observable<any> {
        return this.http.get(`${AppLocalConstants.API_SERVER}/technologies`)
            .map(response => response.json());
    }
}
