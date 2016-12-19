import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TechnologyViewService } from '../../technology/view/view.service';

@Component({
    templateUrl: './view.component.html'
})

export class TechnologyComponent implements OnInit {
    sub: any;
    technology;

    constructor(
        private technologyViewService: TechnologyViewService,
        private _location: Location,
        private route: ActivatedRoute
    ) {}
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let technologyID = params['id'];
            this.technologyViewService.fetchTechnology(technologyID).subscribe(data => {
                this.technology = data.data;
            }, error => console.log('Could not load technology'));
        });
    }

    goBack() {
        this._location.back();
    }
}