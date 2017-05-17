(function () {

	angular
		.module('myChatini')
		.controller('navigationCtrl', navigationCtrl)
		.directive('navigation', navigation);

	navigationCtrl.$inject = ['$location','authentication', '$state', '$rootScope'];
	function navigationCtrl(
			$location: angular.ILocationService,
			authentication:any, 
			$state: angular.ui.IStateService,
			$rootScope: angular.IRootScopeService) {
		var vm = this;

		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();
		
		$rootScope.$on("log", function() {
			console.log('asdf');
			vm.isLoggedIn = authentication.isLoggedIn();
			vm.currentUser = authentication.currentUser();
		});

		vm.logout = function() {
			authentication.logout();
			$state.reload();
		}
	}


	function navigation () {
		return {
			restrict: 'EA',
			templateUrl: '/views/core.navigation.html',
			controller: 'navigationCtrl as navvm'
		};
	}




})();