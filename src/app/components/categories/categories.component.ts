import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {DataTable, DataTableResource, DataTableTranslations} from 'angular-4-data-table';
import {Category} from '../../models/app.models';
import {CategoriesService} from '../../services/categories/categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

    public modalRef: BsModalRef;
    categories = [];
    categoriesCount = 0;
    editedCategory: Category;
    @ViewChild(DataTable) categoriesTable;
    categoriesResource: any;

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

    constructor(private modalService: BsModalService,
                private categoriesService: CategoriesService) {
    }

    reloadCategories(params) {
        this.categories = this.categoriesService.getCategories();
        if (!this.categories) {
            this.categories = [];
        }
        this.categoriesCount = this.categories.length;
        this.categoriesResource = new DataTableResource(this.categories);
        this.categoriesResource.query(params).then(categories => this.categories = categories);
    }

    // setCellColor(category: Category) {
    //     return category.color;
    // }

    addCategory(template: TemplateRef<any>) {
        this.editedCategory = {
            name: ''
            // color: ''
        };
        this.modalRef = this.modalService.show(template);
    }

    deleteCategory(category: Category) {
        if (prompt(`Are you sure you want to delete the category?`, category.name)) {
            this.categories.splice(this.categories.findIndex(categoryItem => categoryItem.name === category.name), 1);
            this.categoriesService.saveCategories(this.categories);
        }
    }

    editCategory(template: TemplateRef<any>) {
        this.editedCategory = {
            name: this.categoriesTable.selectedRow.item.name
            // color: this.categoriesTable.selectedRow.item.color
        };
        this.modalRef = this.modalService.show(template);
    }

    saveCateory(category: Category) {
        const foundCategory = this.categories.find(x => x.name === category.name);
        if (!foundCategory) {
            this.categories.push(category);
        }
        // } else {
        //     foundCategory.color = category.color;
        // }
        this.categoriesService.saveCategories(this.categories);
    }
}
