(function() {

angular
	.module('myChatini')
	.service('authentication', authentication);

authentication.$inject = ['$http', '$window', '$rootScope'];

function authentication (
		$http: angular.IHttpService,
		$window: angular.IWindowService,
		$rootScope: angular.IRootScopeService
		): myTypes.AuthService {

	var saveToken = function (token: string) {
		$window.localStorage['user-token'] = token;
	};

	var getToken = function () {
		return $window.localStorage['user-token'];
	};

	var isLoggedIn = function(): boolean {
		var token = getToken();
		var payload;

		if(token){
			payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	var currentUser = function() {
		if(isLoggedIn()){
			var token = getToken();
			var payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);
			return {
				_id : payload._id,
				email : payload.email,
				name : payload.name,
				language: payload.language
			};
		} else return undefined;
	};

	var register = function(user: { email: string, name: string, password: string }): angular.IPromise<void> {
		return $http.post('/api/register', user).then(function(data: any){
			saveToken(data.data.token);
			$rootScope.$broadcast("log");
		});
	};

	var login = function(user: any): angular.IPromise<void> {
		return $http.post('/api/login', user).then(function(data: any) {
			saveToken(data.data.token);
			$rootScope.$broadcast("log");
		});
	};

	var logout = function(): void {
		$window.localStorage.removeItem('user-token');
		$rootScope.$broadcast("log");
	};

	return {
		currentUser : currentUser,
		saveToken : saveToken,
		getToken : getToken,
		isLoggedIn : isLoggedIn,
		register : register,
		login : login,
		logout : logout
	};
}


})();