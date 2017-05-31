(function() {

	angular.module('myChatini').controller('GroupFormController', 
	function ($scope: angular.IScope, $mdDialog: angular.material.IDialogService) {
		/* TODO:
			What's better?
				ctrlr: $scope.items = [1,2,3];
				view: <div ng-repeat="item in items">
			or?
				ctrlr:	var myScope = this;
						myScope.items = [1,2,3];
				view: <div ng-repeat="item in ctrlr.items"
		*/
		
		$scope.hide = function() { $mdDialog.hide() };
		$scope.cancel = function() {console.log('cancel'); $mdDialog.cancel() };
		$scope.submit = function(data: any) {
			console.log('Submit form with data:', data);
			$mdDialog.hide();
		}
		$scope.items = [1, 2, 3];
	});

})();