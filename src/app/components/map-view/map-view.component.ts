import {Component, Input, OnInit} from '@angular/core';
import {Category, Location, Marker} from '../../models/app.models';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements OnInit {
    @Input() locations: Location[];
    @Input() modalRef: BsModalRef;

    lat = 32.07234025497892;
    lng = 34.78569030739891;
    categories: Category[];
    markers: Marker[];

    ngOnInit() {

        this.markers = [];

        for (const location of this.locations) {
            this.markers.push({
                lat: location.latitude,
                lng: location.longitude,
                label: location.name
            });
        }
    }
}
