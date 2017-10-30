import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent} from '../components/categories/categories.component';
import { LocationsComponent } from '../components/locations/locations.component';

const routes: Routes = [
    { path: '', redirectTo: '/app-locations', pathMatch: 'full'},
    { path: 'app-locations', component: LocationsComponent },
    { path: 'app-categories', component: CategoriesComponent } ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
