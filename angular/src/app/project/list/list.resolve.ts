import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {ProjectListService} from "./list.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ProjectListResolver implements Resolve<any> {

    searchArray;
    orderArray;

    constructor(
        private projectListService: ProjectListService
    ) {
        this.searchArray = [];
        this.orderArray = [];
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
        this.initRouterParams(route.url[0].parameters);
        return this.projectListService.searchProjects(this.searchArray, 1, this.orderArray);
    }

    initRouterParams(params) {
        for (let el in params) {
            if (el != 'order_by' && el != 'order_sort' && el != 'page') {
                this.searchArray[el] = params[el];
            } else {
                this.orderArray[el] = params[el];
            }
        }
    }
}
