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
			converService: myTypes.ConversationService,
			authentication: myTypes.AuthService ) {

		var chatScope = this;
		chatScope.myId = authentication.currentUser()!._id;
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
						from: chatScope.myId,
						converId: chatScope.selectedConver._id,
						message: chatScope.textToSend
					}
				);
			
			chatScope.selectedConver.messages.push(
				{
					from: chatScope.myId,
					message: chatScope.textToSend,
					date: new Date()
				}
			);
			chatScope.textToSend = '';
		}
		socket.on('chat message', function(message: { message: string, from: string, date: Date, converId: string }) {
			// received messages from "me" have already been added to the conversation.
			if(message.from == chatScope.myId) return;

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
			

			for (var i = 0; i < data.length; i++) {
				
				/* Organize members like this:
				conversation.membersObj = {
					 "databaseid1": "Member Name1",
					 "databaseid2": "Member Name2" 
				}
				So I can easily get the name from the ID when showing group messages in the view.
				*/
				let members: {
					[key:string]: string
				} = {}
				for (var j = 0; j < data[i].members.length; j++) {
					members[ data[i].members[j]._id ] = data[i].members[j].name
				}

				data[i].membersObj = members;
				
			}

			chatScope.conversations = data;
		});

		chatScope.selectedConver = chatScope.conversations[0];
		chatScope.selectConver = function(conversation: ChatType) {
			chatScope.selectedConver = conversation;
			if(conversation.messages.length == 0)
				chatContainer.classList.add('unscrollable');
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
			// TODO: this unscrollable is unreliable as f. (maybe not so much anymore)
			chatContainer.scrollTop = chatContainer.scrollHeight;
			if(chatContainer.scrollTop > 0) chatContainer.classList.remove('unscrollable');
			else chatContainer.classList.add('unscrollable');
		};

		chatScope.hideSidenav = function() {
			// $mdComponentRegistry to avoid error when sidenav('sidenavLeft') doesn't exist.
			$mdComponentRegistry.when('leftSidenav').then(function() { 
				$mdSidenav('leftSidenav').close();
			})
		}

		$scope.$on('ngRepeatUpdated', updateScroll);

		
		chatScope.addFriendDialog = function($event: any) {
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
		chatScope.createGroupDialog = function($event: any) {
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
		chatScope.addMemberDialog = function ($event: any) {
			$mdDialog.show({
				locals: { groupId: chatScope.selectedConver._id },
				controller: "AddMemberController",
				templateUrl: '/views/chat.add_friend.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				targetEvent: $event
			}).then(function(data) {
				console.log('Member Form Accepted');
			}, function() {
				console.log('Add Member Cancelled');
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
