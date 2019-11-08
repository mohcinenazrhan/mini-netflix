import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteActivator } from './core/services';

import { HomeComponent, SingleComponent, FavoritesComponent, NotFoundComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'single/:id',
		component: SingleComponent,
		canActivate: [ RouteActivator ]
	},
	{
		path: 'favorites',
		component: FavoritesComponent
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class RoutingModule {}
