import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/view/view.component';
import { UsersComponent } from './user/list/list.component';
import { TechnologiesComponent } from './technology/list/list.component';
import { TechnologyComponent } from './technology/view/view.component';
import { ProjectsComponent } from './project/list/list.component';
import { ProjectComponent } from './project/view/view.component';
import { ProjectEditComponent } from './project/edit/edit.component';
import { ProjectEditResolver } from './project/edit/edit.resolve';
import { LoginComponent } from './auth/login/login.component';
import { TechnologyListResolver } from './technology/list/list.resolve';
import { UserListResolver } from "./user/list/list.resolve";
import { ProjectListResolver } from "./project/list/list.resolve";
import { ProfileComponent } from "./user/profile/profile.component";
import { ProfileResolver } from "./user/profile/profile.resolve";

const routes: Routes = [
    {path: '', redirectTo: 'technologies', pathMatch : 'full'},
    {path: 'user/:id', component: UserComponent},
    {path: 'users', component: UsersComponent, resolve: {list: UserListResolver}},
    {path: 'technologies', component: TechnologiesComponent, resolve: {list: TechnologyListResolver}},
    {path: 'technology/:id', component: TechnologyComponent},
    {path: 'login', component: LoginComponent},
    {path: 'projects',  component: ProjectsComponent, resolve: {list: ProjectListResolver}},
    {path: 'project/:id', component: ProjectComponent},
    {path: 'project/edit/:id', component: ProjectEditComponent, resolve: {list: ProjectEditResolver}},
    {path: 'profile/:id', component: ProfileComponent, resolve: {data: ProfileResolver}}
];

export const routing = RouterModule.forRoot(routes);