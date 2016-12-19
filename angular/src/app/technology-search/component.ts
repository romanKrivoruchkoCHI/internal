import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologiesService } from './service';

@Component({
    selector: 'app-technology-search',
    templateUrl: './component.html'
})

export class TechnologySearchComponent implements OnInit {
    router;
    searchField: any[];
    items: any[];
    autocompliteFields: any[];

    constructor(
        private _router: Router,
        private TechnologiesService: TechnologiesService,
        private route: ActivatedRoute
    ) {
        this.router = _router;
        this.searchField = [];
        this.autocompliteFields = [];
    }

    ngOnInit() {
        let params = this.route.url['value'][0]['parameters'];
        this.TechnologiesService.fetchTechnologies().subscribe(data => {
            for (let item of data.data) {
                this.autocompliteFields.push(item.name);
            }

            if(params['technology']) {
                let technologies = params['technology'].split(',');
                for (let technology of technologies) {
                    for (let autocompliteField of this.autocompliteFields) {
                        if (autocompliteField.toUpperCase() == technology.toUpperCase()) {
                            this.searchField.push(autocompliteField);
                        }
                    }
                }
            }
        });
    }

    onItemAdded(event) {
        let params = this.route.url['value'][0]['parameters'];
        let queryItems = {};

        if (Object.keys(params).length == 0) {
            queryItems['technology'] = event;
        }
        else {
            for (let param in params) {
                if (param == 'technology') {
                    queryItems[param] = params[param] + ',' + event;
                }
                else {
                    queryItems[param] = event;
                }
            }
        }

        this.router.navigate(['users', queryItems]);
    }

    onRemove(event) {
        let params = this.route.url['value'][0]['parameters'];
        let queryItems = {};

        for(let param in params) {
            if(param == 'technology') {
                let newValueArray = [];
                for(let item of params[param].split(',')){
                    if(item != event){
                        newValueArray.push(item);
                    }
                }

                if(newValueArray.length != 0){
                    queryItems[param] = newValueArray.join(',');
                }
            }
            else {
                queryItems[param] = params[param];
            }
        }

        this.router.navigate(['users', queryItems]);
    }
}