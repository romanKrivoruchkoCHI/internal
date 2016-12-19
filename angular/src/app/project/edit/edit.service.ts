import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectEditService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    getProject(id: string): Observable<any> {
        return this.http.get(`${AppLocalConstants.API_SERVER}/project/${id}`)
            .map(response => response.json());
    }

    saveProject(project): Observable<any> {
        return this.http.post(`${AppLocalConstants.API_SERVER}/project/edit`, project)
            .map(response => response.json());
    }

}