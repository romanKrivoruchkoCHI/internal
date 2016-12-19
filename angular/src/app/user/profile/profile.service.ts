import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileViewService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    getUser(id: string): Observable<any> {
        return this.http.get(`${AppLocalConstants.API_SERVER}/profile/${id}`)
            .map(response => response.json());
    }

    saveUser(user): Observable<any> {
        return this.http.post(`${AppLocalConstants.API_SERVER}/profile/save`, user)
            .map(response => response.json());
    }

}