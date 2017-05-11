(function () {

	angular
		.module('myChatini')
		.controller('navigationCtrl', navigationCtrl)
		.directive('navigation', navigation);

	navigationCtrl.$inject = ['$location','authentication'];
	function navigationCtrl($location:any, authentication:any) {
		var vm = this;

		vm.isLoggedIn = authentication.isLoggedIn();

		vm.currentUser = authentication.currentUser();

	}


	function navigation () {
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/navigation/navigation.template.html',
			controller: 'navigationCtrl as navvm'
		};
	}




})();