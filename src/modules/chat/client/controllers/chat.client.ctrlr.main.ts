(function() {

	angular
		.module('myChatini')
		.controller('chatCtrl', chatCtrl)
		.directive('chatini', chatiniDirective)
		.filter('categoryFilter', categoryFilter)
		.directive('onFinishRender', finishedRender);

	chatCtrl.$inject = ['$scope', '$mdSidenav', '$mdComponentRegistry', '$mdDialog'];
	function chatCtrl(
			$scope: any, 
			$mdSidenav: angular.material.ISidenavService, 
			$mdComponentRegistry: any,
			$mdDialog: angular.material.IDialogService ) {

		var chatScope = this;

		var socket = io();
		
		chatScope.sendMsg = function() {
			socket.emit('chat message', { message: chatScope.textToSend } );
			
			chatScope.selectedConver.messages.push(
				{
					from: 'me',
					message: chatScope.textToSend,
					date: new Date()
				}
			);
			chatScope.textToSend = '';
		}
		
		chatScope.conversations = 
			[ // TODO get from server.
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

		chatScope.selectedConver = chatScope.conversations[0];
		chatScope.selectConver = function(conversation: ChatType) {
			chatScope.selectedConver = conversation;
		}

		chatScope.chatCategory = 'all';
		chatScope.chatCategoryClick = function(type: string) {
			if(type != 'all' && type != 'user' && type != 'group') {
				console.error('Chat Categories can only be "all", "user" and "group"');
				return;
			}
			chatScope.chatCategory = type;

			angular.element(document.querySelector('.chatcategory.active') as Element).removeClass('active');
			angular.element(document.querySelector('.chatcategory.'+type) as Element).addClass('active');

		};



		var chatContainer = document.getElementById("chatContainer") as HTMLElement;
		
		function updateScroll(){
			// TODO: this unscrollable is unreliable as f.
			if(chatContainer.scrollTop as any > 0) chatContainer.classList.remove('unscrollable');
			else chatContainer.classList.add('unscrollable');

			chatContainer.scrollTop = chatContainer.scrollHeight;
			
		};

		chatScope.hideSidenav = function() {
			// $mdComponentRegistry to avoid error when sidenav('sidenavLeft') doesn't exist.
			$mdComponentRegistry.when('leftSidenav').then(function() { 
				$mdSidenav('leftSidenav').close();
			})
		}

		$scope.$on('ngRepeatUpdated', updateScroll);

		
		chatScope.createGroupDialog = showGroupDialog;
		chatScope.addFriendDialog = function() {
			console.log('Add Friend Dialog');
		}
		function showGroupDialog($event: any) {
			
			// var parentEl = angular.element(document.querySelector('.container') as Element);
			
			$mdDialog.show({
				controller: "GroupFormController",
				templateUrl: '/views/chat.new_group.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				targetEvent: $event
			}).then(function(data) {
				console.log('Group Form Accepted');
			}, function() {
				console.log('Group Cancelled');
			});
		}
	}

	function chatiniDirective() {
		return {
			restrict: 'EA',
			templateUrl: '/views/chat.main.html',
			controller: 'chatCtrl as chatScope'
		};
	}

	function categoryFilter() {
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
	}

	// Directive whose attribute gets broadcasted when its ng-repeat finishes rendering.
	function finishedRender($timeout: angular.ITimeoutService) {
		return {
			restrict: 'A',
			link: function (scope: angular.IScope, element: Element, attr: any) {
				if (scope.$last === true) {
					$timeout(function () {
						scope.$emit(attr.onFinishRender);
					});
				}
			}
		}
	}

})();


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

// interface MyChatsScope {
// 	conversations: Array<ChatType>,
// 	chatCategory: string,
// 	chatCategoryClick: Function,
// 	textToSend: string,
// 	sendMsg: Function
// }