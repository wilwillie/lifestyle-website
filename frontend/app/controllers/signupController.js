angular.module('fashionPediaApp').controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.emailAvailable = null; // Status validasi email (null, true, atau false)

    // Fungsi untuk signup
    $scope.signup = function() {
        if ($scope.emailAvailable === false) {
            $scope.message = res.data.message || 'Email already exists!';
            return;
        }

        $http.post('http://localhost:5000/auth/signup', $scope.user)
            .then((res) => {
                $scope.message = res.data.message || 'Sign up successful!';
                alert($scope.message);
                // Redirect to login page after signup
                window.location.href = 'login.html';
                $scope.messageClass = 'success';
            })
            .catch((err) => {
                $scope.message = err.data.message || 'An error occurred';
                $scope.messageClass = 'error';
            });
    };
}]);
