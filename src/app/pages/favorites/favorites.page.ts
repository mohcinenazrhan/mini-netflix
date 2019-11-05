import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { MovieService } from '../../core/services/movie.service';

@Component({
	templateUrl: './favorites.page.html',
	styleUrls: [ './favorites.page.scss' ]
})
export class FavoritesComponent implements OnInit {
	movies: any[] = [];
	constructor(private movieService: MovieService, private userService: UserService) {}

	ngOnInit(): void {
		const favorites = this.userService.getFavorites();
		for (const key in favorites) {
			if (favorites.hasOwnProperty(key)) {
				this.movieService.getMovie(+key).subscribe((movie) => {
					this.movies.push(movie);
					console.log(this.movies);
				});
			}
		}
		console.log(this.movies);
	}
}
