
var myApp = angular.module("myChatini", []);

myApp.controller('myChatsCtrl', function($scope) {
	$scope.chatsList = [
		{
			name: 'chatGroup1'
		},
		{
			name: 'chatGroup2'
		}
	]
})

