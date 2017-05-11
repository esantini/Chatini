(function() {

  angular
    .module('myChatini')
    .service('userData', userData);

  userData.$inject = ['$http', 'authentication'];
  function userData ($http: angular.IHttpService, authentication: any) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();