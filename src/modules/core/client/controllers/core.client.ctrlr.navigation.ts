(function () {

	angular
		.module('myChatini')
		.controller('navigationCtrl', navigationCtrl)
		.directive('navigation', navigation);

	navigationCtrl.$inject = ['$location','authentication', '$state', '$rootScope', '$mdSidenav', '$mdComponentRegistry'];
	function navigationCtrl(
			$location: angular.ILocationService,
			authentication:any, 
			$state: angular.ui.IStateService,
			$rootScope: angular.IRootScopeService,
			$mdSidenav: angular.material.ISidenavService,
			$mdComponentRegistry: any) {
		var vm = this;

		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();
		
		$rootScope.$on("log", function() {
			vm.isLoggedIn = authentication.isLoggedIn();
			vm.currentUser = authentication.currentUser();
		});

		vm.logout = function() {
			authentication.logout();
			$state.reload();
		}

		vm.toggleSidenav = function() {
			// $mdComponentRegistry to avoid error when sidenav('left') doesn't exist.
			$mdComponentRegistry.when('leftSidenav').then(function() { 
				$mdSidenav('leftSidenav').toggle();
			})
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