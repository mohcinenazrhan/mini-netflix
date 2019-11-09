import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';

import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable()
export class RouteActivator implements CanActivate {
	constructor(private movieService: MovieService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.movieService.getMovie(+route.paramMap.get('id')).pipe(
			take(1),
			map((movie) => !!movie),
			catchError(() => {
				return this.router.navigate([ '/404' ]);
			})
		);
	}
}
