import { Component, OnInit } from '@angular/core';
import { Observable, Subject, asyncScheduler } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

import Movie from '../../core/models/movie';
import { MovieService } from '../../core/services/movie.service';
import { UserService } from '../../core/services/user.service';

@Component({
	templateUrl: './home.page.html',
	styleUrls: [ './home.page.scss' ]
})
export class HomeComponent implements OnInit {
	favorites = {};
	movies$: Observable<Movie[]>;
	private searchTerms = new Subject<string>();

	constructor(private movieService: MovieService, private userService: UserService) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.getFavorites();

		this.movieService.getMovies().subscribe((movies) => {
			this.movies$ = this.searchTerms.pipe(
				// wait 300ms after each keystroke before considering the term
				debounceTime(300),
				// ignore new term if same as previous term
				distinctUntilChanged(),
				// switch to new search observable each time the term changes
				switchMap((term: string) => this.movieService.searchMovies(term)),
				startWith(movies, asyncScheduler)
			);
		});
	}

	getFavorites(): void {
		this.favorites = this.userService.getFavorites();
	}

	favoriteToggle(id: number): void {
		this.userService.toggleUserFavorite(id);
	}
}
