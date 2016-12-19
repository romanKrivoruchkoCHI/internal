import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { UserListService } from './list.service';
import { MainService } from '../../main/main.service';
import { TechnologySearchComponent } from '../../technology-search/component';

@Component({
    selector: 'app-users',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    entryComponents: [ TechnologySearchComponent ]
})

export class UsersComponent implements OnInit {
    users;
    firstName: string;
    departments;
    searchArray;
    orderArray;
    router;
    name: string;
    email: string;
    isSort: boolean;
    page: number;
    departmentSelected;
    nameOrder: string;
    pages: number;
    params;

    constructor(
        private userListService: UserListService,
        private route: ActivatedRoute,
        private _router: Router,
        private mainService: MainService,
        private location: Location
    ) {
        this.router = _router;
        this.searchArray = {};
        this.orderArray = {};
        this.isSort = true; // false - desc, true - asc
        this.page = 1;
        this.params = {};

        _router.events.subscribe((val) => this.onRouteChange(val));
    }

    onRouteChange(event){
        if(event instanceof NavigationEnd) {
            let params = this.prepareRouteParams();

            if(params['technology'] != this.searchArray['technology']) {
                this.onSearchChange(params['technology'], 'technology');
            }
        }
    }

    ngOnInit() {
        this.initRouterParams();
        this.users = this.route.snapshot.data['list']['data'];
        this.pages = this.route.snapshot.data['list']['pages'];
        this.departments = this.route.snapshot.data['list']['departments'];
    }

    onSearchChange(event, fieldName) {
        let searchValue = typeof event === 'object' ? event.target.value : event;
        searchValue = decodeURIComponent(decodeURIComponent(searchValue));
        let flag = false;

        if(Object.keys(this.searchArray).length != 0) {
            for (var param in this.searchArray) {
                if(param != fieldName) {
                    flag = true;
                } else if(param == fieldName) {
                    flag = false;

                    if(this.searchArray[param] != searchValue) {
                        this.searchArray[param] = searchValue;
                    }
                }
            }
            if(flag){
                this.searchArray[fieldName] = searchValue;
            }
        } else {
            this.searchArray[fieldName] = searchValue;
        }

        this.searchArray = this.mainService.deleteEmptySearchParams(this.searchArray);
        this.page = 1;
        let queryParams = {};
        Object.assign(queryParams, this.searchArray, this.orderArray);

        this.userListService.searchUsers(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.users = data.data;
            this.pages = data.pages;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/users;' + queryString);
    }

    onFilter(field) {
        this.isSort = this.nameOrder == field ? !this.isSort : this.isSort = false;
        this.nameOrder = field;
        this.orderArray = {order_by: field, order_sort: this.isSort ? 'desc' : 'asc'};
        this.page = 1;

        let queryParams = {};
        Object.assign(queryParams, this.searchArray, this.orderArray);

        this.userListService.searchUsers(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.users = data.data;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/users;' + queryString);
    }

    initRouterParams() {
        this.params = this.route.snapshot.params;

        for(let el in this.params) {
            if(el != 'order_by' && el != 'order_sort' && el != 'page') {
                this.searchArray[el] = this.params[el];
            } else {
                this.orderArray[el] = this.params[el];
            }
        }

        this.name = this.params['name'] ? this.params['name'] : null;
        this.email = this.params['email'] ? this.params['email'] : null;
        this.departmentSelected = this.params['department_id'] ? this.params['department_id'] : null;
        this.isSort = (this.params['order_sort'] && this.params['order_sort'] == 'desc') ? true : false;
        this.nameOrder = this.params['order_by'] ? this.params['order_by'] : 'last_name';
    }

    onScrollDown() {
        this.page ++;
        if(this.page <= this.pages) {
            this.searchArray['page'] = 1;
            this.userListService.searchUsers(this.searchArray, this.page, this.orderArray).subscribe(data => {
                for (var item of data.data) {
                    this.users.push(item);
                }
            });
        }
    }

    onScrollUp() {
    }

    prepareRouteParams() {
        let urlArray = this.router.url.split(';');
        let resultArray = {};
        urlArray.splice(0, 1);

        for(let item of urlArray){
            let subItem = item.split('=');
            resultArray[subItem[0]] = decodeURIComponent(decodeURIComponent(subItem[1]));
        }

        return resultArray;
    }
}
