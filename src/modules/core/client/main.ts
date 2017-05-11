
var myApp = angular.module("myChatini", ['ngRoute']);

interface ChatType {
	name: string,
	category: string,
	messages: Message[]
}
interface Message {
	from: string,
	message: string | Drawing,
	date: Date
}
interface Drawing {}
interface MyChatsScope {
	chatsList: Array<ChatType>,
	chatCategory: string,
	chatCategoryClick: Function,
	textToSend: string,
	sendMsg: Function
}

myApp.controller('myChatsCtrl', function($scope: MyChatsScope) {
	$scope.chatsList = [
		{	name: 'chatGroup1',
			category: 'group',
			messages: [ 
				{
					from: 'userio1',
					message: 'quiubo!',
					date: new Date()
				},
				{
					from: 'userio1',
					message: 'quiubo!',
					date: new Date()
				}, {
					from: 'me',
					message: 'weep!',
					date: new Date()
				}, {
					from: 'me',
					message: 'weep!!',
					date: new Date()
				}
			]
		},
		{	name: 'chatGroup2',
			category: 'group',
			messages: [] },
		{
			name: 'chatPerson1',
			category: 'user',
			messages: []
		}
	];
	$scope.chatCategory = 'all';
	$scope.chatCategoryClick = function(type: string) {
		if(type != 'all' && type != 'user' && type != 'group') {
			return; // TODO return error.
		}
		$scope.chatCategory = type;

		angular.element(document.querySelector('.chatcategory.active')).removeClass('active');
		angular.element(document.querySelector('.chatcategory.'+type)).addClass('active');

	};
	
	$scope.sendMsg = function() {
		console.log('sending message:', $scope.textToSend);
	}
});

myApp.filter('categoryFilter', function() {
	return function(elements: Array<ChatType>, currentCategory: string) {
		
		if(currentCategory == 'all') {
			return elements;
		}
		
		var filtered: Array<ChatType> = [];
		for (var i = 0; i < elements.length; i++) {
			if(elements[i].category == currentCategory) {
				filtered.push(elements[i]);
			}
		}
		return filtered;
		
	}
});

