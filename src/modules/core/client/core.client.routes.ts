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
				authentication: myTypes.AuthService,
				$transitions: any) {

		// Only logged in users may see /profile
		$transitions.onBefore({to: 'profile'}, function( transition: any ) {

			if(!authentication.isLoggedIn()) {
				// solution from: https://stackoverflow.com/a/40177897/3987900 
					// note: solution says I should return true to stop transition, seems like it's wrong.
				transition.router.stateService.transitionTo('home');
				return false;
			}
		});

		// If already logged in, redirect to 'profile'
		$transitions.onBefore({to: 'login'}, if_user_is_logged_in);
		// 'register' does the same thing as 'login', can they be grouped?
		$transitions.onBefore({to: 'register'}, if_user_is_logged_in);
		
		function if_user_is_logged_in( transition: any ) {
			if( authentication.isLoggedIn() ) {
				transition.router.stateService.transitionTo('home');
				return false;
			}
		}
	}
	
	angular
		.module('myChatini')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authentication', '$transitions', run]);

})();