import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class MainService {
    
    deleteEmptySearchParams(params) {
        for(var param in params) {
            if(params[param] == '' || params[param] == 'undefined') {
                delete params[param];
            }
        }

        return params;
    }

    makeQueryString(searchArray, orderArray) {
        let queryParams = {};
        Object.assign(queryParams, searchArray, orderArray);
        let queryString = '';

        for(let query in queryParams){
            queryString += query + '=' + queryParams[query] + ';';
        }

        return queryString;
    }
}
