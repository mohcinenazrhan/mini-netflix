import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../../core/services/movie.service';
import { UserService } from '../../core/services/user.service';

import { Location } from '@angular/common';
import Movie from '../../core/models/movie';

@Component({
	templateUrl: './single.page.html',
	styleUrls: [ './single.page.scss' ]
})
export class SingleComponent implements OnInit {
	favorites = {};
	movie: Movie;
	poster: 'https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg';

	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService,
		private location: Location,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.getMovie();
		this.getFavorites();
	}

	getMovie(): void {
		this.movie = this.route.snapshot.data.movie;
	}

	getFavorites(): void {
		this.favorites = this.userService.getFavorites();
	}

	favoriteToggle(id: number): void {
		this.userService.toggleUserFavorite(id);
	}

	goBack(): void {
		this.location.back();
	}
}
