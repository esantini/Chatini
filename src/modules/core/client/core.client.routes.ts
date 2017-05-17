(function () {

	angular.module('myChatini');

	function config (
				$stateProvider: angular.ui.IStateProvider,
				$urlRouterProvider: angular.ui.IUrlRouterProvider,
				$locationProvider: angular.ILocationProvider ) {
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/views/core.home.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.state('register', {
				url: '/register',
				templateUrl: '/views/user.register.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.state('login', {
				url: '/login',
				templateUrl: '/views/user.login.html',
				controller: 'loginCtrl',
				controllerAs: 'vm'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: '/views/user.profile.html',
				controller: 'profileCtrl',
				controllerAs: 'vm'
			});

		$urlRouterProvider.otherwise('/');

		
		//TODO: still needed after changing from ngRoute to ui-router ?
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
				$location.path('/login');
			}
			else if (($location.path() === '/login' || $location.path() === '/register') && authentication.isLoggedIn()) {
				$location.path('/profile');
			}
		});
	}
	
	angular
		.module('myChatini')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authentication', run]);

})();