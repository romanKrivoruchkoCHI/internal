import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserListService {

    constructor(private http: HttpClient) {
        this.http = http;
    }
    
    searchUsers(searchParams, page, sortParams?): Observable<any> {
        let params = new URLSearchParams();
        for (var param in searchParams) {
            params.set(param, searchParams[param]);
        }

        if(sortParams) {
            for (let sortParam in sortParams) {
                params.set(sortParam, sortParams[sortParam]);
            }
        }

        params.set('page', page);
        
        return this.http.get(`${AppLocalConstants.API_SERVER}/users`, params)
            .map(response => response.json());
    }
    
    fetchDepartments(): Observable<any> {
        return this.http.get(`${AppLocalConstants.API_SERVER}/departments`)
            .map(response => response.json());
    }

}