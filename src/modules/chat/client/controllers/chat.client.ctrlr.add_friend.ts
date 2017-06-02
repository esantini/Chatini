(function() {

angular.module('myChatini').controller('AddFriendController', 
function (
		$scope: angular.IScope,
		$mdDialog: angular.material.IDialogService,
		$timeout: angular.ITimeoutService,
		$q: angular.IQService,
		userData: any) {
	/* TODO:
		What's better?
			ctrlr: $scope.items = [1,2,3];
			view: <div ng-repeat="item in items">
		or?
			ctrlr:	var myScope = this;
					myScope.items = [1,2,3];
			view: <div ng-repeat="item in ctrlr.items"
	*/

	$scope.submit = function(data: any) {
		if(data) {
			userData.friendRequest(data);
			$mdDialog.hide();
		}
	}
	$scope.items = ['ei', 'bi', 'si'];

	// list of `state` value/display objects
	$scope.selectedItem  = null;
	$scope.searchText    = null;
	$scope.querySearch   = querySearch;


	// ******************************
	// Internal methods
	// ******************************

	/**
	 * Search for states... use $timeout to simulate
	 * remote dataservice call.
	 */
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

	/**
	 * Create filter function for a query string
	 */
	// function createFilterFor(query: string) {
	// 	var lowercaseQuery = angular.lowercase(query);

	// 	return function filterFn(state: any) {
	// 		return (state.value.indexOf(lowercaseQuery) === 0);
	// 	};

	// }
});

})();