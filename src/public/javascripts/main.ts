
var myApp = angular.module("myChatini", []);

interface ChatType {
	name: string,
	category: string
}
interface MyChatsScope {
	chatsList: Array<ChatType>,
	chatCategory: string,
	chatCategoryClick: Function
}

myApp.controller('myChatsCtrl', function($scope: MyChatsScope) {
	
	$scope.chatsList = [
		{	name: 'chatGroup1',
			category: 'group' },
		{
			name: 'chatGroup2',
			category: 'group' },
		{
			name: 'chatPerson1',
			category: 'user'
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

