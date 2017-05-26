(function() {

	angular
		.module('myChatini')
		.controller('chatCtrl', chatCtrl)
		.directive('chatini', chatiniDirective)
		.filter('categoryFilter', categoryFilter);

	chatCtrl.$inject = [];
	function chatCtrl() {
		console.log('Chat Main Controller Initialized');

		var chatScope = this;

		var socket = io();
		
		chatScope.sendMsg = function() {
			console.log('sending message:', chatScope.textToSend);
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