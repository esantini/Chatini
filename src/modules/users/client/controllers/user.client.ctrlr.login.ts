(function () {

	angular
		.module('myChatini')
		.controller('loginCtrl', loginCtrl)
		.directive('loginForm', loginForm);

	loginCtrl.$inject = ['$location', 'authentication'];
	function loginCtrl($location: angular.ILocationService, authentication: myTypes.AuthService) {
		var loginvm = this;

		loginvm.credentials = {
			email : "",
			password : ""
		};

		loginvm.onSubmit = function () {
			authentication
				.login(loginvm.credentials)
				.then(
					function(){
						$location.path('home');
					},
					function(err:any){
						loginvm.authfail = true;
						if(err.statusText === "Unauthorized") {
							loginvm.errMessage = 'badcredentials';
						} else {
							loginvm.errMessage = err.statusText;
						}
					}
				);
		};

		loginvm.authfail = false;
	}

	function loginForm () {
		return {
			restrict: 'EA',
			templateUrl: '/views/user.login-form.html',
			controller: 'loginCtrl as loginvm'
		};
	}

})();