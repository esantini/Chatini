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
		
		$scope.isMyRequest = $scope.conversation.creator._id == authentication.currentUser()._id;

		$scope.submit = function() {
			converService.acceptFriendship($scope.conversation.creator._id).then(function(){
				$scope.conversation.status = 'active'
			});
		}

	}
})();
