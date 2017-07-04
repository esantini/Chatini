(function() {

angular.module('myChatini')
	.service('socketComs', socketComs);

socketComs.$inject = ['authentication'];
function socketComs (authentication: myTypes.AuthService) {

	

	return {

	}
}

})();