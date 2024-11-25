angular.module('loginApp').factory('AuthService', ['$http', function($http) {
    const baseUrl = 'http://localhost:5000/auth';

    return {
        signup: (user) => $http.post(`${baseUrl}/signup`, user),
        login: (user) => $http.post(`${baseUrl}/login`, user)
    };
}]);
