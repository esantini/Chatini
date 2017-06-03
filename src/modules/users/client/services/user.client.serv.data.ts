(function() {

angular
	.module('myChatini')
	.service('userData', userData);

userData.$inject = ['$http', 'authentication'];
function userData ($http: angular.IHttpService, authentication: any) {

	var getProfile = function () {
		return $http.get('/api/profile', {
			headers: {
				Authorization: 'Bearer '+ authentication.getToken()
			}
		});
	};

	function getUsersList( query: string ) {
		return $http.get('/api/userlist', {
			headers: {
				Authorization: 'Bearer '+ authentication.getToken()
			},
			params: {
				query: query
			}
		});
	}
	
	function friendRequest( _id: any ) {
		return $http.post('/api/friendrequest', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			},
			params: {
				query: _id
			}
		})
	}

	return {
		getUsersList: getUsersList,
		getProfile : getProfile,
		friendRequest: friendRequest
	};
}


})();