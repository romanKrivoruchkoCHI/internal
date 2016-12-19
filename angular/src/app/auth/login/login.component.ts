import { Component } from '@angular/core';

import { AuthLoginService } from './login.service';
import {Router} from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent{
    user: any;
    error: boolean;

    constructor(
        private authLoginService: AuthLoginService,
        private router: Router
    ) {}

    ngOnInit() {
        this.user = {};
    }

    doLogin = function () {
        this.authLoginService.login(this.user).subscribe(response => {
            this.router.navigateByUrl('technologies');
        }, error => {this.error = true});
    };
}