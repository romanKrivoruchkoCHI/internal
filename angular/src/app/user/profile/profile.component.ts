import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {ProfileViewService} from "./profile.service";
import {AuthLoginService} from "../../auth/login/login.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    user;
    saved: boolean;
    error;
    departments;
    technologies;
    technologiesArr;

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private service: ProfileViewService,
        private authLoginService: AuthLoginService
    ) {}

    ngOnInit() {
        this.user = this.route.snapshot.data['data']['user'];
        this.departments = this.route.snapshot.data['data']['departments'];
        this.technologiesArr = [];
        this.technologies = this.route.snapshot.data['data']['technologies'];
        this.user.technologiesArr = [];
        //load all technologies
        for (let item in this.route.snapshot.data['data']['technologies']) {
            this.technologiesArr.push(this.technologies[item].name);
        }
        //load user technologies
        for (let item in this.user['technologies']) {
            this.user['technologiesArr'].push(this.user['technologies'][item].name);
        }
        this.error = {};
    }

    goBack() {
        this._location.back();
    }

    save() {
        this.user['technologies'] = {};
        for (let item in this.user['technologiesArr']) {
            let tech = this.technologies[this.user['technologiesArr'][item]];
            this.user['technologies'][tech.id] = tech;
        }
        this.service.saveUser(this.user).subscribe(data => {
            this.saved = true;
            this.authLoginService.changeInfo(this.user);
            this.router.navigateByUrl('user/'+this.user.id);
        }, (err) => this.error = JSON.parse(err._body).error);
    }

    onItemAdded(event) {
        
    }

    onRemove(event) {
        
    }
}