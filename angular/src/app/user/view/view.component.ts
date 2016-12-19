import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserViewService } from '../../user/view/view.service';

@Component({
    selector: 'app-user',
    templateUrl: './view.component.html'
})

export class UserComponent implements OnInit {
    sub: any;
    user;
    technologies;

    constructor(
        private userViewService: UserViewService,
        private _location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let userID = params['id'];
            this.userViewService.fetchUser(userID).subscribe(data => {
                this.user = data.data.user;
            }, error => console.log('Could not load user'));
        });
    }


    goBack() {
        this._location.back();
    }
}
//https://github.com/hdjirdeh/angular2-hn