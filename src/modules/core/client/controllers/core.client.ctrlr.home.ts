(function() {

	angular
		.module('myChatini')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['authentication'];
	function homeCtrl(authentication: any) {
		console.log('Home Controller Initialized');

		var homeScope = this;

		homeScope.isLoggedIn = authentication.isLoggedIn();

	}
})();