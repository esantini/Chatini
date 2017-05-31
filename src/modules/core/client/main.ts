/**
 * This file is the 1st one to execute, 
 *   it is placed at the top of the concatenated bundle.
 */
angular.module("myChatini", ['ui.router', 'ngMaterial'])
	.config(['$mdThemingProvider',
		function($mdThemingProvider: angular.material.IThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('light-green')
				.accentPalette('brown');
		}
	]);
