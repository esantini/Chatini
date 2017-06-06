(function() {

angular.module('myChatini')
	.service('converService', converService);


converService.$inject = ['$http', 'authentication'];
function converService($http: angular.IHttpService, authentication: any){
	var myConversations = function () {
		return $http.get('/api/myconversations', {
			headers: {
				Authorization: 'Bearer '+ authentication.getToken()
			}
		}).then(function(data: any) {
			data = data.data;
			
			// Conversations with "friends" get the name of the member who's not the current user.
			let memberIndex: number;
			for (var i = 0; i < data.length; i++) {
				memberIndex = 0;
				if(data[i].category == 'friend') {
					if(data[i].members[0]._id == authentication.currentUser()._id)
						memberIndex++;
					data[i].name = data[i].members[memberIndex].name;
				}
			}
			return data;
		});
	};
	
	function friendRequest( _id: any ) {
		return $http.get('/api/friendrequest', { // TODO should be post but auth fails.
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			},
			params: {
				query: _id
			}
		});
	};
	
	var acceptFriendship = function (newFriendId: string) {
		return $http.get('/api/acceptfriendship', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken(),
				friend: newFriendId
			}
		});
	}

	return {
		myConversations: myConversations,
		friendRequest: friendRequest,
		acceptFriendship: acceptFriendship
	}
}

})();