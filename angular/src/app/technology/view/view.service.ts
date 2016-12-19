import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class TechnologyViewService {
    constructor(private http: HttpClient) {
        this.http = http;
    }

    fetchTechnology(id: string): Observable<any> {
        return this.http.get(`${AppLocalConstants.API_SERVER}/technology/${id}`)
            .map(response => response.json());
    }
}