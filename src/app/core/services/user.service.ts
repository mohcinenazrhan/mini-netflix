import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private favorites: object;

	constructor() {
		const userFavorite = localStorage.getItem('userFavorite');
		this.favorites = userFavorite ? JSON.parse(userFavorite) : {};
	}

	getFavorites(): object {
		return this.favorites;
	}

	toggleUserFavorite(id: number): void {
		this.favorites[id]
			? (this.favorites[id].isFavorite = !this.favorites[id].isFavorite)
			: (this.favorites[id] = { isFavorite: true });

		this.saveFavorites(this.favorites);
	}

	saveFavorites(favoritesObj: object) {
		// save to local storage;
		localStorage.setItem('userFavorite', JSON.stringify(favoritesObj));
	}
}
