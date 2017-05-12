/// <reference types="angular" />
/// <reference types="angular-route" />

(function () {

	angular
		.module('myChatini')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location', 'authentication'];
	function loginCtrl($location: angular.ILocationService, authentication:any) {
		var vm = this;

		vm.credentials = {
			email : "",
			password : ""
		};

		vm.onSubmit = function () {
			authentication
				.login(vm.credentials)
				.then(
					function(){
						$location.path('profile');
					},
					function(err:any){
						console.error("My Login Controller Error: ", err);
					}
				);
		};

	}

})();