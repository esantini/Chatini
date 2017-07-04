(function () {

	angular
		.module('myChatini')
		.controller('registerCtrl', registerCtrl)
		.directive('registerForm', registerForm);

	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl($location: angular.ILocationService, authentication: myTypes.AuthService) {
		var registervm: 
		{
			credentials:{
				name: string,
				email: string,
				password: string
			},
			onSubmit(): void
		} = this;

		registervm.credentials = {
			name : "",
			email : "",
			password : ""
		};

		registervm.onSubmit = function () {

			console.log('Submitting registration');
			authentication
				.register(registervm.credentials)
				.then(
					function(){
						$location.path('home');
					},
					function(err: any){
						console.error(err.data);
					}
				);
			
		};
	}

	function registerForm () {
		return {
			restrict: 'EA',
			templateUrl: '/views/user.register-form.html',
			controller: 'registerCtrl as registervm'
		};
	}

})();