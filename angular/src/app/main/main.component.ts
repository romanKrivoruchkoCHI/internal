import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab-header',
    templateUrl: './main.component.html'
})

export class MainComponent{
    sub;
    activeTab;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.activeTab = this.router.url ? this.router.url.substring(1) : 'users';
    }

    goTab(tab) {
        this.router.navigate([tab]);
    }
}
