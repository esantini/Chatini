

declare namespace myTypes {

	interface UserDataService {
		getUsersList( query: string ): angular.IHttpPromise<{}>,
		getProfile(): angular.IHttpPromise<{}>,
		changeLang( newLanguage: string ): angular.IHttpPromise<{}>
	}

	interface AuthService {
		currentUser(): { 
				_id: string,
				email: string,
				name: string,
				language: string
			} | undefined,
		saveToken(token: string): void,
		getToken(): string,
		isLoggedIn(): boolean,
		register(user: any): angular.IPromise<void>, // TODO input type user
		login(user: any): angular.IPromise<void>,
		logout(): void
	}
}
