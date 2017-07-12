

describe('login', function() {

	var Users: myTypes.UserDataService;

	beforeEach(angular.mock.module('myChatini'));

	beforeEach(
		inject(function( userData: myTypes.UserDataService ){
			Users = userData;
		})
	);

// following the tutorial: https://scotch.io/tutorials/testing-angularjs-with-jasmine-and-karma-part-1
	it('should exist', function() {

		chai.expect(Users).to.exist;
		
	});

	it('should fail if attempting to input the wrong credentials', function() {
		console.log('should fail if attempting to input the wrong credentials');
	});

});
