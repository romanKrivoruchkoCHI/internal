import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppLocalConstants } from '../../app.local-constants';
import { HttpClient } from '../../core/http-client';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthLoginService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    login(user): Observable<any> {
        return this.http.post(`${AppLocalConstants.API_SERVER}/authenticate`, user)
            .map(response => {
                let data = response.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                return response.json();
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    changeInfo(user){
        localStorage.setItem('user', JSON.stringify(user));
    }

}