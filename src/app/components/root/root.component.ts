import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../services/categories/categories.service';
import {categoriesData} from './categories-data';
import {locationsData} from './locations-data';
import {LocationsService} from '../../services/locations/locations.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit {

    constructor(private categoriesService: CategoriesService,
                private locationsService: LocationsService) {
    }

    ngOnInit() {
        if (this.categoriesService.getCategories() === null) {
            this.categoriesService.saveCategories(categoriesData);
        }
        if (this.locationsService.getLocations() === null) {
            this.locationsService.saveLocations(locationsData);
        }
    }
}
