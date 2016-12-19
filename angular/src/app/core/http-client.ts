import { Injectable } from '@angular/core';
import { Http, XHRBackend, Headers, Request, RequestOptions, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpClient extends Http {
    http;
    defaultOptions;

    constructor(backend: XHRBackend, options: RequestOptions) {
        super(backend, options);
    }

    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    request(url: string | Request, options?: RequestOptionsArgs):  Observable<Response> {
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError (self: HttpClient) {
        return (res: Response) => {
            if (res.status === 401 || res.status === 400) {
                window.location.href = '/login';
            }
            return Observable.throw(res);
        };
    }
    
    get(url, search?: URLSearchParams) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let options = {
            headers: headers
        };

        if(search)
            options['search'] = search;

        return super.get(<string>url, options);
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let options = {
            headers: headers
        };

        return super.post(<string>url, data, options);
    }
}