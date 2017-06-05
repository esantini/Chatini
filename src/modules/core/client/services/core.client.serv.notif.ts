(function() {

angular.module('myChatini')
	.service('notifications', notifications);

notifications.$inject = ['authentication'];
function notifications(authentication: any) {

	function newNotif() {}

	return {
		newNotif: newNotif
	}
}

})();