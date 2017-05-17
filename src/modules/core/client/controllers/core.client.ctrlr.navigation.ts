(function () {

	angular
		.module('myChatini')
		.controller('navigationCtrl', navigationCtrl)
		.directive('navigation', navigation);

	navigationCtrl.$inject = ['$location','authentication', '$route'];
	function navigationCtrl($location:any, authentication:any, $route: angular.route.IRouteService) {
		var vm = this;

		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();

		vm.logout = function() {
			authentication.logout();
			vm.isLoggedIn = authentication.isLoggedIn();
			vm.currentUser = authentication.currentUser();
			$route.reload();
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