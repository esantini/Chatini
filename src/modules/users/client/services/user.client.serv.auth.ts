(function() {

angular
	.module('myChatini')
	.service('authentication', authentication);

authentication.$inject = ['$http', '$window', '$rootScope'];

function authentication ($http: angular.IHttpService, $window: angular.IWindowService, $rootScope: angular.IRootScopeService) {

	var saveToken = function (token: any) {
		$window.localStorage['user-token'] = token;
	};

	var getToken = function () {
		return $window.localStorage['user-token'];
	};

	var isLoggedIn = function() {
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
				email : payload.email,
				name : payload.name
			};
		}
	};

	var register = function(user: any) {
		return $http.post('/api/register', user).then(function(data: any){
			saveToken(data.data.token);
			$rootScope.$broadcast("log");
		});
	};

	var login = function(user: any) {
		return $http.post('/api/login', user).then(function(data: any) {
			saveToken(data.data.token);
			$rootScope.$broadcast("log");
		});
	};

	var logout = function() {
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