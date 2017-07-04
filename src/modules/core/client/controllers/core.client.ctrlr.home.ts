(function() {

	angular
		.module('myChatini')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['authentication', '$rootScope'];
	function homeCtrl(authentication: myTypes.AuthService, $rootScope: angular.IRootScopeService) {

		var homeScope = this;

		homeScope.isLoggedIn = authentication.isLoggedIn();

		$rootScope.$on("log", function() {
			homeScope.isLoggedIn = authentication.isLoggedIn();
		});

	}
})();