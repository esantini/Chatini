(function() {

	angular
		.module('myChatini')
		.controller('chatCtrl', chatCtrl)
		.directive('chatini', chatiniDirective);

	chatCtrl.$inject = [];
	function chatCtrl() {
		console.log('Chat Main Controller Initialized');

		var chatScope = this;


	}

	function chatiniDirective() {
		return {
			restrict: 'EA',
			templateUrl: '/views/chat.main.html',
			controller: 'chatCtrl as chatScope'
		};
	}
})();