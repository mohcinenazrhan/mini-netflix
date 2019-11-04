import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { movies } from './movies';
import Movie from './core/models/movie';

@Injectable({
	providedIn: 'root'
})
export class DataService implements InMemoryDbService {
	constructor() {}
	createDb() {
		const topMovies = movies.slice(0, 10).map((movie, index) => {
			movie.id = index + 1;
			return movie;
		});

		return { movies: topMovies };
	}

	// Overrides the genId method to ensure that a hero always has an id.
	// If the heroes array is empty,
	// the method below returns the initial number (11).
	// if the heroes array is not empty, the method below returns the highest
	// hero id + 1.
	genId(topMovies: Movie[]): number {
		return topMovies.length > 0 ? Math.max(...topMovies.map((movie) => movie.id)) + 1 : 11;
	}
}
