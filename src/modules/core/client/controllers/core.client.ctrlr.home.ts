(function() {

	angular
		.module('myChatini')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['authentication', '$rootScope'];
	function homeCtrl(authentication: any, $rootScope: angular.IRootScopeService) {
		console.log('Home Controller Initialized');

		var homeScope = this;

		homeScope.isLoggedIn = authentication.isLoggedIn();

		$rootScope.$on("log", function() {
			homeScope.isLoggedIn = authentication.isLoggedIn();
		});

	}
})();