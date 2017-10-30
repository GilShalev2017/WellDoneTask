import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './config/routes.config';
import {AgmCoreModule} from '@agm/core';
import {DataTableModule} from 'angular-4-data-table';

import {RootComponent} from './components/root/root.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {CategoryComponent} from './components/category/category.component';
import {LocationsComponent} from './components/locations/locations.component';
import {LocationComponent} from './components/location/location.component';
import {MapViewComponent} from './components/map-view/map-view.component';

import {LocationsService} from './services/locations/locations.service';
import {CategoriesService} from './services/categories/categories.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

@NgModule({
    declarations: [
        RootComponent, CategoriesComponent, CategoryComponent, LocationsComponent, LocationComponent, MapViewComponent
    ],
    imports: [
        AppRoutingModule, BrowserModule, HttpModule, FormsModule, DataTableModule,
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDa24_tR6T-qARcCsWzkvZ8Y7eabvZx71c',
            libraries: []
        })
    ],
    providers: [LocationsService, LocalStorageService, CategoriesService],
    bootstrap: [RootComponent]
})
export class AppModule {
}
