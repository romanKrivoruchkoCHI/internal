import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routes';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { TagInputModule } from 'ng2-tag-input';
import { HttpClient } from './core/http-client';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/view/view.component';
import { UsersComponent } from './user/list/list.component';
import { ProjectComponent } from './project/view/view.component';
import { TechnologiesComponent } from './technology/list/list.component';
import { TechnologyComponent } from './technology/view/view.component';
import { ProjectsComponent } from './project/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { TechnologySearchComponent } from './technology-search/component';
import { HeaderComponent } from "./components/header/header.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ProjectEditComponent } from './project/edit/edit.component';

// services
import { UserListService } from './user/list/list.service';
import { UserViewService } from './user/view/view.service';
import { TechnologyListService } from './technology/list/list.service';
import { ProjectListService } from './project/list/list.service';
import { ProjectViewService } from './project/view/view.service';
import { TechnologyViewService } from './technology/view/view.service';
import { AuthLoginService } from './auth/login/login.service';
import { MainService } from './main/main.service';
import { TechnologiesService } from './technology-search/service';
import { ProfileViewService } from "./user/profile/profile.service";
import { ProjectEditService } from './project/edit/edit.service';

// resolvers
import { TechnologyListResolver } from './technology/list/list.resolve';
import { UserListResolver } from "./user/list/list.resolve";
import { ProjectListResolver } from "./project/list/list.resolve";
import { ProfileResolver } from "./user/profile/profile.resolve";
import { ProjectEditResolver } from './project/edit/edit.resolve';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserComponent,
    UsersComponent,
    TechnologiesComponent,
    TechnologyComponent,
    LoginComponent,
    ProjectsComponent,
    ProjectComponent,
    TechnologySearchComponent,
    HeaderComponent,
    ProfileComponent,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    TabsModule,
    InfiniteScrollModule,
    TagInputModule,
    Ng2DatetimePickerModule
  ],
  providers: [
    //services
    UserListService,
    UserViewService,
    TechnologyListService,
    AuthLoginService,
    ProjectListService,
    ProjectViewService,
    HttpClient,
    MainService,
    TechnologyViewService,
    TechnologiesService,
    ProfileViewService,
    ProjectEditService,
    //resolvers
    TechnologyListResolver,
    UserListResolver,
    ProjectListResolver,
    ProfileResolver,
    ProjectEditResolver,
    {
      provide: HttpClient,
      useFactory: (backend:XHRBackend, options:RequestOptions) => {
          return new HttpClient(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
