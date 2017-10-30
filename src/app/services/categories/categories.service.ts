import {Injectable} from '@angular/core';
import {Category} from '../../models/app.models';
import {LocalStorageService} from '../local-storage/local-storage.service';
import * as M from '../../models/app.models';

@Injectable()
export class CategoriesService {
    categories: Category[];

    constructor(private localStorageService: LocalStorageService) {
    }

    getCategories(): Category[] {
        const categoriesString: string = this.localStorageService.getFromStorage(M.StorageKeys.Categories.toString());
        return <Category[]>JSON.parse(categoriesString);
    }

    saveCategories(categories: Category[]) {
        this.localStorageService.saveToStorage(M.StorageKeys.Categories.toString(), JSON.stringify(categories));
    }
}
