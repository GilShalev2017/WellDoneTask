import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Location, StorageKeys} from '../../models/app.models';
import {LocationsService} from '../../services/locations/locations.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {DataTable, DataTableResource, DataTableTranslations} from 'angular-4-data-table';
import {CategoriesService} from '../../services/categories/categories.service';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

    locations = [];
    categories = [];
    selectedCategory: string;
    locationsCount = 0;
    filteredLocations: Location[];
    editedLocation: Location;
    public modalRef: BsModalRef;
    @ViewChild(DataTable) locationsTable;
    locationsResource: any;

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

    constructor(private modalService: BsModalService,
                private categoriesService: CategoriesService,
                private locationsService: LocationsService) {

        this.locations = this.locationsService.getLocations();

        if (!this.locations) {
            this.locations = [];
        }

        this.locationsCount = this.locations.length;
        this.filteredLocations = this.locations;

        this.locationsResource = new DataTableResource(this.locations);
    }

    reloadLocations(params) {
        this.locationsResource.query(params).then(locations => this.filteredLocations = locations);
    }

    ngOnInit() {
        this.categories = this.categoriesService.getCategories();
        this.categories.unshift({name: 'All'});
    }

    showMapView(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    addLocation(template: TemplateRef<any>) {
        if (!this.categories || this.categories.length === 0) {
            return;
        }

        this.editedLocation = {
            name: '',
            address: '',
            latitude: 0,
            longitude: 0,
            category: null
        };
        this.modalRef = this.modalService.show(template);
    }

    deleteLocation(location: Location) {

        if (prompt(`Are you sure you want to delete the location?`, location.name)) {
            this.locations.splice(this.locations.findIndex(locationItem => locationItem.name === location.name), 1);
            this.filteredLocations = this.locations;
            this.locationsService.saveLocations(this.locations);
        }
    }

    editLocation(template: TemplateRef<any>) {
        this.editedLocation = {
            name: this.locationsTable.selectedRow.item.name,
            address: this.locationsTable.selectedRow.item.address,
            latitude: this.locationsTable.selectedRow.item.latitude,
            longitude: this.locationsTable.selectedRow.item.longitude,
            category: this.locationsTable.selectedRow.item.category,
        };
        this.modalRef = this.modalService.show(template);
    }

    saveLocation(location: Location) {
        const foundLocation = this.locations.find(x => x.name === location.name);
        if (!foundLocation) {
            this.locations.push(location);
        } else {
            foundLocation.address = location.address;
            foundLocation.latitude = location.latitude;
            foundLocation.longitude = location.longitude;
            foundLocation.category = location.category;
        }

        this.filteredLocations = this.locations;
        this.locationsService.saveLocations(this.locations);
    }

    filterByCategory() {
        if (this.selectedCategory !== 'All') {
            this.filteredLocations = this.locations.filter(x => x.category.includes(this.selectedCategory));
        } else {
            this.filteredLocations = this.locations;
        }
    }
}
