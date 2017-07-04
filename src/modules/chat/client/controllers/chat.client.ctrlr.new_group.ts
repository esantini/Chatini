(function() {

	angular.module('myChatini')
		.controller('GroupFormController', groupFormController);

	groupFormController.$inject = ['$scope', 'converService'];
	function groupFormController( $scope: angular.IScope, converService: myTypes.ConversationService ) {

		$scope.groupName = "";

		$scope.submit = function(data: any) {
			converService.createGroup($scope.groupName);
		}

	}
})();