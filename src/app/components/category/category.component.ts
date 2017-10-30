import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../models/app.models';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent {

    @Input() modalRef: BsModalRef;
    @Input() editedCategory: Category;
    @Output() categorySaved: EventEmitter<Category> = new EventEmitter<Category>();

    saveCategory() {
        this.categorySaved.emit(this.editedCategory);
        this.modalRef.hide();
    }
}
