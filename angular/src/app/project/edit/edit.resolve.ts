import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { ProjectEditService } from "./edit.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProjectEditResolver implements Resolve<any> {

    constructor(private editService:ProjectEditService) {

    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<any> {
        return this.editService.getProject(route.params['id']);
    }
}