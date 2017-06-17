/**
 * This file is the 1st one to execute, 
 *   it is placed at the top of the concatenated bundle.
 */
angular.module("myChatini", [
		'ui.router',
		'ngMaterial',
		'ngMessages',
		'ngAnimate',
		'ngCookies',
		'pascalprecht.translate',
		'ngSanitize'
	])
	.config(['$mdThemingProvider', '$translateProvider',
		function(
				$mdThemingProvider: angular.material.IThemingProvider,
				$translateProvider: angular.translate.ITranslateProvider) {

			$mdThemingProvider.theme('default')
				.primaryPalette('light-green')
				.accentPalette('brown');
				
			$translateProvider.useSanitizeValueStrategy('');

			$translateProvider.useStaticFilesLoader({
				prefix:'languages/lang-',
				suffix: '.json'
			});
			$translateProvider.determinePreferredLanguage(function() {
				return document.head.lang;
			});
			

//			$translateProvider.storagePrefix('language');
//			$translateProvider.useCookieStorage();

			
		}
	// ]).run(['$cookies', '$translate', 'authentication',
	// 	function(
	// 			$cookies: angular.cookies.ICookiesService, 
	// 			$translate: angular.translate.ITranslateService, 
	// 			authentication: any){
	// 		// Since I can't run services in the "config", the "run" function serves as an initializer
	// 	}
	]);
	