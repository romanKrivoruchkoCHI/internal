import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../auth/login/login.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    user;
    constructor(
        private router: Router,
        private authLoginService: AuthLoginService
    ) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    doLogout = function () {
        this.authLoginService.logout();
        this.router.navigateByUrl('login');
    };

}
