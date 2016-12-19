import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from '../../main/main.service';
import { TechnologyListService } from './list.service';

@Component({
    selector: 'app-technologies',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})

export class TechnologiesComponent{
    technologies;
    searchArray;
    orderArray;
    page: number;
    name: string;
    router;
    keywords;
    isSort: boolean;
    nameOrder: string;
    params;
    pages;
    
    constructor(
        private technologyListService: TechnologyListService,
        private mainService: MainService,
        private route: ActivatedRoute,
        private _router: Router,
        private location: Location
    ) {
        this.router = _router;
        this.searchArray = {};
        this.orderArray = {};
        this.isSort = false;
        this.nameOrder = 'name';
        this.params = {};
    }

    ngOnInit() {
        this.initRouterParams();
        this.technologies = this.route.snapshot.data['list']['data'];
        this.pages = this.route.snapshot.data['list']['pages'];
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
        
        this.technologyListService.fetchTechnologies(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.technologies = data.data;
            this.pages = data.pages;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/technologies;' + queryString);
    }

    onFilter(field) {
        this.isSort = !this.isSort;
        this.orderArray = {order_by: field, order_sort: this.isSort ? 'desc' : 'asc'};
        this.page = 1;
        let queryParams = {};
        Object.assign(queryParams, this.searchArray, this.orderArray);

        this.technologyListService.fetchTechnologies(this.searchArray, this.page, this.orderArray).subscribe(data => {
            this.technologies = data.data;
        });

        let queryString = this.mainService.makeQueryString(this.searchArray, this.orderArray);
        this.location.go('/technologies;' + queryString);
    }

    initRouterParams() {
        this.params = this.route.snapshot.params;

        for(let el in this.params) {
            if(el != 'order_by' && el != 'order_sort' && el != 'page') {
                this.searchArray[el] = this.params[el];
            } 
            else if(el == 'order_by') {
                this.orderArray[el] = this.nameOrder;
            }
            else{
                this.orderArray[el] = this.params[el];
            }
        }

        this.name = this.params['name'] ? this.params['name'] : null;
        this.keywords = this.params['email'] ? this.params['email'] : null;
        this.isSort = (this.params['order_sort'] && this.params['order_sort'] == 'desc') ? true : false;
    }

    onScrollDown() {
        this.page ++;
        if(this.page <= this.pages) {
            this.searchArray['page'] = 1;
            this.technologyListService.fetchTechnologies(this.searchArray, this.page, this.orderArray).subscribe(data => {
                for (var item of data.data) {
                    this.technologies.push(item);
                }
            });
        }
    }

    onScrollUp(){
    }
}