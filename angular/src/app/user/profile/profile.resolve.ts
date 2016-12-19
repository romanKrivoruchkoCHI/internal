import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {ProfileViewService} from "./profile.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ProfileResolver implements Resolve<any> {

    constructor(private profileService:ProfileViewService) {

    }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<any> {
        return this.profileService.getUser(route.params['id']);
    }
}