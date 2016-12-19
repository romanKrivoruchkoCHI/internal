import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectListService } from './list.service';
import { MainService } from '../../main/main.service'


@Component({
    selector: 'app-projects',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})

export class ProjectsComponent{
    sub: any;
    projects;
    types: any[];
    statuses: any[];
    searchArray;
    orderArray;
    router;
    name;
    typeSelected;
    statusSelected;
    nameOrder;
    isSort: boolean;
    page;
    pages: number;
    params;

    constructor(
        private projectListService: ProjectListService,
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
    }

    ngOnInit() {
        this.initRouterParams();
        this.projects = this.route.snapshot.data['list']['data'];
        this.pages = this.route.snapshot.data['list']['pages'];
        this.types = [
            {key: 0, name: 'Inner'},
            {key: 1, name: 'Outer'},
            {key: 2, name: 'Fake'}
        ];
        this.statuses = [
            {key: 0, name: 'Open'},
            {key: 1, name: 'Closed'}
        ];
    }

    onSearchChange(event, fieldName) {
        let searchValue = event.target.value;
        let flag = false;

        if(Object.keys(this.searchArray).length != 0) {
            for (var param in this.searchArray) {
                if(param != fieldName) {
                    flag = true;
                } else if(param == fieldName) {
                    flag = false;

                    if(this.searchArray[param] != searchValue) {
                        this.searchArray[param]  = searchValue;
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

        this.projectListService.searchProjects(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.projects = data.data;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/projects;' + queryString);
    }

    onFilter(field) {
        this.isSort = this.nameOrder == field ? !this.isSort : this.isSort = false;
        this.nameOrder = field;
        this.orderArray = {order_by: field, order_sort: this.isSort ? 'desc' : 'asc'};
        this.page = 1;

        this.projectListService.searchProjects(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.projects = data.data;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/projects;' + queryString);
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
        this.typeSelected = this.params['type'] ? this.params['type'] : null;
        this.statusSelected = this.params['status'] ? this.params['status'] : null;
        this.isSort = (this.params['order_sort'] && this.params['order_sort'] == 'desc') ? true : false;
        this.nameOrder = this.params['order_by'] ? this.params['order_by'] : 'name';
    }

    onScrollDown() {
        this.page ++;
        if (this.page <= this.pages) {
            this.searchArray['page'] = 1;

            this.projectListService.searchProjects(this.searchArray, this.page, this.orderArray).subscribe(data => {
                for (var item of data.data) {
                    this.projects.push(item);
                }
            });
        }
    }

    onScrollUp() {
    }
}