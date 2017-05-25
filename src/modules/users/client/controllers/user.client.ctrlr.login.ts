(function () {

	angular
		.module('myChatini')
		.controller('loginCtrl', loginCtrl)
		.directive('loginForm', loginForm);

	loginCtrl.$inject = ['$location', 'authentication'];
	function loginCtrl($location: angular.ILocationService, authentication:any) {
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
						console.error("My Login Controller Error: ", err);
					}
				);
		};

	}

	function loginForm () {
		return {
			restrict: 'EA',
			templateUrl: '/views/user.login-form.html',
			controller: 'loginCtrl as loginvm'
		};
	}

})();