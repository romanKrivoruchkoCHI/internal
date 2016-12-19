import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectEditService } from "./edit.service";

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit.component.html'
})

export class ProjectEditComponent implements OnInit {
    project;
    saved: boolean;
    error;
    types;
    statuses;

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private service: ProjectEditService
    ) {}

    ngOnInit() {
        this.project = this.route.snapshot.data['list']['data'];
        this.error = {};
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

    goBack() {
        this._location.back();
    }

    save() {
        this.project['start_date'] = this.project['start_date'].toString();
        this.project['close_date'] = this.project['close_date'].toString();

        this.service.saveProject(this.project).subscribe(data => {
            this.saved = true;
        }, (err) => this.error = JSON.parse(err._body).error);
    }
}