(function() {

angular.module('myChatini')
	.service('notifications', notifications);

notifications.$inject = ['authentication'];
function notifications(authentication: myTypes.AuthService) {

	function newNotif() {}

	return {
		newNotif: newNotif
	}
}

})();