(function() {

angular
	.module('myChatini')
	.controller('profileCtrl', profileCtrl);

profileCtrl.$inject = ['$location', 'userData', '$cookies', '$translate'];
function profileCtrl(
		$location: angular.ILocationService,
		userData: myTypes.UserDataService,
		$cookies: angular.cookies.ICookiesService,
		$translate: angular.translate.ITranslateService) {

	var vm = this;

	vm.user = {};

	userData.getProfile()
		.then(
			function(data: any) {
				vm.user = data.data;
				vm.currLanguage = vm.user.language;
			},
			function (e: string) {
				console.error("My Profile Controller Error: ", e);
			}
		);

	vm.languages = [
		{	id: 'en',
			val: 'English' },
		{	id: 'es',
			val: 'Español'},
		{	id: 'de',
			val: 'Deutch'}];
	
	vm.changeLang = function() {
		userData.changeLang(vm.user.language).then(function(response: any) {
			$cookies.put('language', vm.user.language);
			$translate.use(vm.user.language);
			location.reload();
		});
	}
}

})();