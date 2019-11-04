import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, SingleComponent, FavoritesComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'single/:id',
		component: SingleComponent
	},
	{
		path: 'favorites',
		component: FavoritesComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class RoutingModule {}
