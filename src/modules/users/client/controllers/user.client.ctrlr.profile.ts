(function() {

angular
	.module('myChatini')
	.controller('profileCtrl', profileCtrl);

profileCtrl.$inject = ['$location', 'userData'];
function profileCtrl($location: angular.ILocationService, userData: any) {
	var vm = this;

	vm.user = {};

	userData.getProfile()
		.then(
			function(data: any) {
				vm.user = data;
			},
			function (e: string) {
				console.error("My Profile Controller Error: ", e);
			}
		);
}

})();