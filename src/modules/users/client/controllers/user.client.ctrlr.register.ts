(function () {

	angular
		.module('myChatini')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl($location: any, authentication: any) {
		var vm = this;

		vm.credentials = {
			name : "",
			email : "",
			password : ""
		};

		vm.onSubmit = function () {

			console.log('Submitting registration');
			authentication
				.register(vm.credentials)
				.then(
					function(){
						$location.path('profile');
					},
					function(err: any){
						console.error(err.data);
					}
				);
			
		};

	}

})();