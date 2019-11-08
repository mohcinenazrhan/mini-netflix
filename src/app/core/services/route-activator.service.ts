import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';

import { map } from 'rxjs/operators';

@Injectable()
export class RouteActivator implements CanActivate {
	constructor(private movieService: MovieService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot) {
		let movieExists = false;

		this.movieService.getMovie(+route.paramMap.get('id')).subscribe((result) => {
			if (!result) {
				this.router.navigate([ '/404' ]);
			}

			movieExists = true;
		});

		return movieExists;
	}
}
