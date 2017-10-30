import {Injectable} from '@angular/core';
import {Location} from '../../models/app.models';
import {LocalStorageService} from '../local-storage/local-storage.service';
import * as M from '../../models/app.models';

@Injectable()
export class LocationsService {
    locations: Location[];

    constructor(private localStorageService: LocalStorageService) {
    }

    getLocations(): Location[] {
        const locationsString: string = this.localStorageService.getFromStorage(M.StorageKeys.Locations.toString());
        return <Location[]>JSON.parse(locationsString);
    }

    saveLocations(locations: Location[]) {
        this.localStorageService.saveToStorage(M.StorageKeys.Locations.toString(), JSON.stringify(locations));
    }
}
