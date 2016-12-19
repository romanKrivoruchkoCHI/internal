import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TechnologyListService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    fetchTechnologies(searchParams, page, sortParams?): Observable<any> {
        let params = new URLSearchParams();
        for (var param in searchParams) {
            params.set(param, searchParams[param]);
        }

        if(sortParams) {
            for (var sortParam in sortParams) {
                params.set(sortParam, sortParams[param]);
            }
        }

        params.set('page', page);

        return this.http.get(`${AppLocalConstants.API_SERVER}/technologies`, params)
            .map(response => response.json());
    }

}