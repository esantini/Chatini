/// <reference types="angular" />
/// <reference types="angular-route" />

(function () {

	angular.module('myChatini');

	function config (
				$routeProvider: angular.route.IRouteProvider,
				$locationProvider: angular.ILocationProvider ) {
		
		$routeProvider
			.when('/', {
				templateUrl: '/views/core.home.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: '/views/user.register.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.when('/login', {
				templateUrl: '/views/user.login.html',
				controller: 'loginCtrl',
				controllerAs: 'vm'
			})
			.when('/profile', {
				templateUrl: '/views/user.profile.html',
				controller: 'profileCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});

		// use the HTML5 History API
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}

	function run(
				$rootScope: angular.IRootScopeService, 
				$location: angular.ILocationService, 
				authentication: any) {
		$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
			if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
				$location.path('/');
			}
		});
	}
	
	angular
		.module('myChatini')
		.config(['$routeProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authentication', run]);

})();