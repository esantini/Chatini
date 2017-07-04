(function() {

angular.module('myChatini')
	.controller('AddMemberController', addMemberController);

	addMemberController.$inject = ['$scope', '$mdDialog', '$timeout', '$q', 'userData', 'converService', 'groupId'];
	function addMemberController (
			$scope: angular.IScope,
			$mdDialog: angular.material.IDialogService,
			$timeout: angular.ITimeoutService,
			$q: angular.IQService,
			userData: myTypes.UserDataService,
			converService: myTypes.ConversationService,
			groupId: string) {
		/* TODO:
			What's better?
				ctrlr: $scope.items = [1,2,3];
				view: <div ng-repeat="item in items">
			or?
				ctrlr:	var myScope = this;
						myScope.items = [1,2,3];
				view: <div ng-repeat="item in ctrlr.items"
		*/

		$scope.dialogTitle = "adduserdialog.addgroupmember";

		$scope.submit = function() {
			converService.addGroupMember(groupId, $scope.selectedItem._id);
			$mdDialog.hide();
		}

		$scope.selectedItem  = null;
		$scope.searchText    = null;
		$scope.querySearch   = querySearch;

		var deferred: angular.IDeferred<any>;
		var timeoutId: NodeJS.Timer;
		function querySearch (query: string) {
			deferred = $q.defer();
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function() {
				userData.getUsersList(query).then(
					function(data: any) {
						deferred.resolve( data.data );
					},
					function(err: Error){ deferred.reject(); throw err; }
				);

			}, 500);
			return deferred.promise;
		}
	}

})();