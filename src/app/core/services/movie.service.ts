import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Movie from '../models/movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {
	SERVER_URL = 'http://localhost:8080/api/movies';

	constructor(private httpClient: HttpClient) {}

	public getMovies(): Observable<Movie[]> {
		return this.httpClient.get<Movie[]>(this.SERVER_URL);
	}

	getMovie(id: number): Observable<Movie> {
		return this.httpClient.get<Movie>(`${this.SERVER_URL}/${id}`);
	}

	/* GET heroes whose name contains search term */
	searchMovies(term: string): Observable<Movie[]> {
		if (!term.trim()) {
			// if not search term, return all movies.
			return this.getMovies();
		}
		return this.httpClient
			.get<Movie[]>(`${this.SERVER_URL}/?Title=${term}`)
			.pipe(
				tap((_) => this.log(`found movies matching "${term}"`)),
				catchError(this.handleError<Movie[]>('searchMovies', []))
			);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		// this.messageService.add(`HeroService: ${message}`);
	}
}
