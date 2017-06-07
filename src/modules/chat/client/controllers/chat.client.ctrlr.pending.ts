(function() {
angular.module('myChatini')
	.directive('pendingFriendship', pendingFriendship);

	function pendingFriendship(){
		return {
			restrict: 'E',
			templateUrl: '/views/chat.pending_friend.html',
			controller: pendingFriendCtrlr,
			scope: {
				conversation: '='
			}
		}
	}

	pendingFriendCtrlr.$inject = ['$scope', 'converService', 'authentication'];
	function pendingFriendCtrlr( $scope: angular.IScope, converService: any, authentication: any) {
		
		$scope.myId = authentication.currentUser()._id;

		$scope.submit = function() {
			var currConver = $scope.conversation;
			converService.acceptFriendship(currConver.creator._id).then(function(){
				currConver.status = 'active'
			});

		}

	}
})();
