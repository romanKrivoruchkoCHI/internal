import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProjectViewService } from '../../project/view/view.service';

@Component({
    selector: 'app-user',
    templateUrl: './view.component.html'
})

export class ProjectComponent implements OnInit {
    sub: any;
    project;
    technologies;
    types;
    statuses;

    constructor(
        private projectViewService: ProjectViewService,
        private _location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let projectID = params['id'];
            this.projectViewService.fetchProject(projectID).subscribe(data => {
                this.project = data.data;

                this.types = [
                    {key: 0, name: 'Inner'},
                    {key: 1, name: 'Outer'},
                    {key: 2, name: 'Fake'}
                ];
                this.statuses = [
                    {key: 0, name: 'Open'},
                    {key: 1, name: 'Closed'}
                ];
            }, error => console.log('Could not load project'));
        });
    }

    goBack() {
        this._location.back();
    }
}