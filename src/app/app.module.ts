import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { MovieService, RouteActivator } from './core/services';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, SingleComponent, FavoritesComponent, NotFoundComponent } from './pages';
import { FooterComponent, HeaderComponent } from './shared/components';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SingleComponent,
		FavoritesComponent,
		FooterComponent,
		HeaderComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		RoutingModule,
		InMemoryWebApiModule.forRoot(DataService),
		HttpClientModule,
		MDBBootstrapModule.forRoot()
	],
	providers: [ MovieService, RouteActivator ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
