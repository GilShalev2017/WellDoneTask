import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category, Location, Marker} from '../../models/app.models';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {CategoriesService} from '../../services/categories/categories.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit, AfterViewInit {
    @Input() editedLocation: Location;
    @Input() modalRef: BsModalRef;
    @Output() locationSaved: EventEmitter<Location> = new EventEmitter<Location>();
    lat = 32.07234025497892;
    lng = 34.78569030739891;
    categories: Category[];
    marker: Marker;
    @ViewChild('selectCategory') selectElRef;
    selectedValues: string[];

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.categories = this.categoriesService.getCategories();

        this.marker = {
            lat: this.editedLocation.latitude,
            lng: this.editedLocation.longitude,
            draggable: true,
            label: this.editedLocation.name
        };

        if (this.editedLocation.longitude !== 0) {
            this.lat = this.editedLocation.latitude;
            this.lng = this.editedLocation.longitude;
        }
    }

    ngAfterViewInit() {
        if (this.editedLocation.category) {
            this.selectedValues = this.editedLocation.category;
            this.updateSelectList();
        }
    }

    updateSelectList() {
        let options = this.selectElRef.nativeElement.options;
        for (let i = 0; i < options.length; i++) {
            options[i].selected = this.selectedValues.indexOf(options[i].value) > -1;
        }
    }

    saveLocation() {
        this.locationSaved.emit(this.editedLocation);
        this.modalRef.hide();
    }

    mapClicked($event) {
        this.editedLocation.latitude = $event.coords.lat;
        this.editedLocation.longitude = $event.coords.lng;

        this.marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true,
            label: this.editedLocation.name
        };
    }

    markerDragEnd(marker: Marker, $event) {
        marker.lat = $event.coords.lat;
        marker.lng = $event.coords.lng;
        this.editedLocation.latitude = $event.coords.lat;
        this.editedLocation.longitude = $event.coords.lng;
    }
}
