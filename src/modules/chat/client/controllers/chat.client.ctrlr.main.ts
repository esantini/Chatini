(function() {

	angular
		.module('myChatini')
		.controller('chatCtrl', chatCtrl)
		.directive('chatini', chatiniDirective)
		.filter('categoryFilter', categoryFilter)
		.directive('onFinishRender', finishedRender);

	chatCtrl.$inject = [
			'$scope', 
			'$mdSidenav', 
			'$mdComponentRegistry', 
			'$mdDialog', 
			'converService',
			'authentication'
		];
	function chatCtrl(
			$scope: angular.IScope, 
			$mdSidenav: angular.material.ISidenavService, 
			$mdComponentRegistry: any,
			$mdDialog: angular.material.IDialogService,
			converService: any,
			authentication: any ) {

		var chatScope = this;
		var myId = authentication.currentUser()._id;
		var socket = io();
		
		socket.on('connect', function() {
			socket
				.emit('authenticate', { token: authentication.getToken() }) //send the jwt
				.on('authenticated', function () {
					//do other things
				})
				.on('unauthorized', function(msg: any) {
					console.log("unauthorized: " + JSON.stringify(msg.data));
					throw new Error(msg.data.type);
				})
		});
		socket.on('connected', function() {}); // Happens after authentication.

		chatScope.sendMsg = function() {
			socket.emit('chat message', 
					{
						from: myId,
						converId: chatScope.selectedConver._id,
						message: chatScope.textToSend
					}
				);
			
			chatScope.selectedConver.messages.push(
				{
					from: 'me',
					message: chatScope.textToSend,
					date: new Date()
				}
			);
			chatScope.textToSend = '';
		}
		socket.on('chat message', function(message: { message: string, from: string, date: Date, converId: string }) {
			// received messages from "me" have already been added to the conversation.
			if(message.from == myId) return;

			for (var i = 0; i < chatScope.conversations.length; i++) {
				if(chatScope.conversations[i]._id == message.converId) {
					chatScope.conversations[i].messages.push(
						{
							from: message.from,
							message: message.message,
							date: message.date
						});
					$scope.$digest();
					return;
				}
			}
			
		});
		
		chatScope.conversations = [];

		converService.myConversations().then(function( data: any ) {
			chatScope.conversations = data;
		});

		chatScope.selectedConver = chatScope.conversations[0];
		chatScope.selectConver = function(conversation: ChatType) {
			chatScope.selectedConver = conversation;
		}

		chatScope.chatCategory = 'all';
		chatScope.chatCategoryClick = function(type: string) {
			if(type != 'all' && type != 'friend' && type != 'group') {
				console.error('Chat Categories can only be "all", "friend" and "group"');
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
		chatScope.addFriendDialog = showFriendDialog;
		function showFriendDialog($event: any) {
			$mdDialog.show({
				controller: "AddFriendController",
				templateUrl: '/views/chat.add_friend.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				targetEvent: $event
			}).then(function(data) {
				console.log('Friend Form Accepted');
			}, function() {
				console.log('Add Friend Cancelled');
			});
		}
		function showGroupDialog($event: any) {
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
