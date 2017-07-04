

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
		register(user: { email: string, name: string, password: string }): angular.IPromise<void>,
		login(user: {email: string, password: string }): angular.IPromise<void>,
		logout(): void
	}

	interface ConversationService {
		myConversations(): angular.IPromise<any>,
		friendRequest(_id: string): angular.IHttpPromise<{}>,
		acceptFriendship(newFriendId: string): angular.IHttpPromise<{}>,
		createGroup(groupName: string): angular.IHttpPromise<{}>,
		addGroupMember(groupId: string, memberId: string): angular.IHttpPromise<{}>
	}
}
